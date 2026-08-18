// Vercel Edge Function — handles the contact form POST and sends it via Resend.
// Requires env vars: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
import { checkBotId } from "botid/server";

export const config = { runtime: "edge" };

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot — real users never see or fill this field
  formRenderedAt?: number; // client timestamp (ms) from when the form mounted
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SUBMIT_MS = 1500; // reject submissions faster than a human could plausibly type

// Best-effort in-memory rate limit. Scoped to a single warm edge instance, so it's
// not a strict global limit, but it adds friction against naive scripted floods
// without provisioning external storage.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const botVerification = await checkBotId();
  if (botVerification.isBot) {
    return json({ error: "Access denied" }, 403);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return json({ error: "Too many requests" }, 429);
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  // Honeypot tripped, or submitted faster than a human could — silently
  // report success so bots don't learn to adapt.
  const tooFast =
    typeof body.formRenderedAt === "number" && Date.now() - body.formRenderedAt < MIN_SUBMIT_MS;
  if ((body.company ?? "").trim() !== "" || tooFast) {
    return json({ ok: true }, 200);
  }

  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const message = (body.message ?? "").trim().slice(0, 5000);

  if (!name || !email || !message || !EMAIL_PATTERN.test(email)) {
    return json({ error: "Missing or invalid fields" }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return json({ error: "Server not configured" }, 500);
  }

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Portfolio contact <${fromEmail}>`,
      to: [toEmail],
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    }),
  });

  if (!resendRes.ok) {
    return json({ error: "Failed to send" }, 502);
  }

  return json({ ok: true }, 200);
}
