// Vercel Edge Function — handles the contact form POST and sends it via Resend.
// Requires env vars: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
export const config = { runtime: "edge" };

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
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
