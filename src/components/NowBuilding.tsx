import { useLanguage } from "../context/LanguageContext";
import { currentProjects } from "../i18n/currentProjects";
import { GlowCard } from "./ui/glow-card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function NowBuilding() {
  const { lang, t } = useLanguage();

  return (
    <section id="now" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={t.now.eyebrow} heading={t.now.heading} />
        </Reveal>
        <div className="grid gap-6">
          {currentProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 60}>
              <GlowCard className="flex h-full flex-col rounded-lg border border-border bg-surface p-6 sm:p-8">
                <p className="inline-flex items-start gap-2 self-start rounded-lg border border-border px-3 py-1 text-sm text-text-secondary">
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                  <span>{project.status[lang]}</span>
                </p>
                <h3 className="mt-4 text-2xl font-medium">{project.title}</h3>
                <p className="mt-1 text-base font-medium text-warm">{project.tagline[lang]}</p>
                <p className="mt-4 text-base text-text-secondary">{project.description[lang]}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {project.highlights[lang].map((item) => (
                    <li key={item} className="flex gap-3 text-base text-text">
                      <span aria-hidden="true" className="text-accent">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 text-sm text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener" : undefined}
                      onClick={(e) => {
                        if (link.external || !link.href.startsWith("#")) return;
                        e.preventDefault();
                        document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-base text-accent hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {link.label[lang]} →
                    </a>
                  ))}
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
