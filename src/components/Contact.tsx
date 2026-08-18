import { useRef, useState, type FormEvent } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const CONTACT_EMAIL = "tatul.ghazaryan.ai@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/ai-tatul/";
const UPWORK_URL = "https://www.upwork.com/freelancers/~011e2043d2d1a3ff07";
const GITHUB_URL = "https://github.com/TatulAi";

const links = [
  {
    key: "email" as const,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6.5h18v11H3v-11Zm0 0 9 6.5 9-6.5"
      />
    ),
  },
  {
    key: "linkedin" as const,
    href: LINKEDIN_URL,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-3.7c0-1.5 1-2.3 2.2-2.3 1.2 0 2 .8 2 2.3v3.7" />
      </>
    ),
  },
  {
    key: "github" as const,
    href: GITHUB_URL,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.53 9.53 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    ),
  },
  {
    key: "upwork" as const,
    href: UPWORK_URL,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.5 9a3.5 3.5 0 0 1-3.44-2.85l-.32-1.65h-2v6.2c0 1.4-.6 2.4-1.87 2.4-.85 0-1.5-.45-1.85-1.13l-1.72.85A3.9 3.9 0 0 0 9.87 15.6c2.3 0 3.85-1.5 3.85-3.9V9.4a3.5 3.5 0 0 0 3.78 1.6L17.5 9Z"
      />
    ),
  },
];

type SubmitStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — left empty by real users
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const formRenderedAt = useRef(Date.now());

  const linkLabels: Record<(typeof links)[number]["key"], string> = {
    email: t.contact.emailLabel,
    linkedin: t.contact.linkedinLabel,
    github: t.contact.githubLabel,
    upwork: t.contact.upworkLabel,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company, formRenderedAt: formRenderedAt.current }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={t.contact.eyebrow} heading={t.contact.heading} />
          <p className="-mt-6 mb-10 max-w-lg text-lg text-text-secondary">{t.contact.subtext}</p>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-base text-text-secondary">
                  {t.contact.formName}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-b border-border bg-transparent py-2 text-lg text-text outline-none transition-colors focus:border-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-base text-text-secondary">
                  {t.contact.formEmail}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-b border-border bg-transparent py-2 text-lg text-text outline-none transition-colors focus:border-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-base text-text-secondary">
                  {t.contact.formMessage}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="resize-none border-b border-border bg-transparent py-2 text-lg text-text outline-none transition-colors focus:border-accent"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 w-fit rounded-full bg-cta-bg px-7 py-3 text-base font-medium text-cta-text transition-colors hover:bg-cta-bg-hover hover:text-cta-text-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? t.contact.formSending : t.contact.formSubmit}
              </button>
              {status === "success" && (
                <p role="status" className="text-base text-text-secondary">
                  {t.contact.formSuccess}
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-base text-red-500">
                  {t.contact.formError}
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={100}>
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target={link.key === "email" ? undefined : "_blank"}
                    rel={link.key === "email" ? undefined : "noreferrer"}
                    aria-label={link.key === "email" ? linkLabels.email : undefined}
                    className="flex items-center gap-3 text-lg text-text-secondary transition-colors hover:text-accent"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {link.icon}
                    </svg>
                    {link.key === "email" ? CONTACT_EMAIL : linkLabels[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
