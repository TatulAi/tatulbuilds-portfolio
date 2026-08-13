import { useLanguage } from "../context/LanguageContext";
import { certificationsMeta } from "../i18n/certifications";
import { GlowCard } from "./ui/glow-card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Certifications() {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={t.certifications.eyebrow} heading={t.certifications.heading} />
        </Reveal>

        {certificationsMeta.length === 0 ? (
          <Reveal>
            <p className="italic text-text-secondary/70">{t.certifications.emptyState}</p>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {certificationsMeta.map((cert, i) => {
              const item = t.certifications.items[cert.id];
              const isCompleted = cert.status === "completed";
              return (
                <Reveal key={cert.id} delay={i * 60}>
                  <GlowCard className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
                    <div className="flex items-start justify-between gap-4">
                      <svg
                        className="mt-0.5 shrink-0 text-warm"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="12" cy="8.5" r="5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5 7 21l5-2.5 5 2.5-1.5-8.5" />
                      </svg>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 text-sm ${
                          isCompleted ? "border-accent text-accent" : "border-border text-text-secondary"
                        }`}
                      >
                        {isCompleted ? t.certifications.statusCompleted : t.certifications.statusInProgress}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-medium">{item.name}</h3>
                    <p className="mt-2 flex-1 text-base text-text-secondary">{item.description}</p>
                    {isCompleted && cert.issuer && (
                      <p className="mt-4 text-sm text-text-secondary">{cert.issuer}</p>
                    )}
                    {isCompleted && cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-base text-accent hover:text-accent-hover"
                      >
                        {t.certifications.viewCredential} →
                      </a>
                    )}
                  </GlowCard>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
