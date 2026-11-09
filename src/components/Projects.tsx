import { lazy, Suspense, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { projectsMeta } from "../i18n/projects";
import { GlowCard } from "./ui/glow-card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Separate chunk so the ElevenLabs SDK is only downloaded when the demo is opened.
const VoiceDemoDialog = lazy(() => import("./VoiceDemoDialog"));

export function Projects() {
  const { t } = useLanguage();
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section id="projects" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={t.projects.eyebrow} heading={t.projects.heading} />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {projectsMeta.map((project, i) => (
            <Reveal key={project.id} delay={i * 60}>
              <GlowCard className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
                <h3 className="text-lg font-medium">{project.name}</h3>
                <p className="mt-2 flex-1 text-base text-text-secondary">{t.projects.items[project.id].description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 text-sm text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.demoAgentId !== undefined ? (
                  <>
                    <button
                      type="button"
                      aria-label={`${t.projects.tryDemo}: ${project.name}`}
                      aria-haspopup="dialog"
                      onClick={() => setDemoOpen(true)}
                      className="mt-5 cursor-pointer self-start text-left text-base text-accent hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {t.projects.tryDemo} →
                    </button>
                    <p className="mt-2 text-sm text-text-secondary">{t.projects.demoHint}</p>
                    {demoOpen && (
                      <Suspense fallback={null}>
                        <VoiceDemoDialog
                          title={project.name}
                          agentId={project.demoAgentId}
                          calendarUrl={project.demoCalendarUrl}
                          onClose={() => setDemoOpen(false)}
                        />
                      </Suspense>
                    )}
                  </>
                ) : (
                  // TODO: replace placeholder "#" link once a public URL exists
                  <a
                    href={project.link}
                    target={project.isPlaceholderLink ? undefined : "_blank"}
                    rel={project.isPlaceholderLink ? undefined : "noreferrer"}
                    aria-disabled={project.isPlaceholderLink}
                    onClick={(e) => {
                      if (project.isPlaceholderLink) e.preventDefault();
                    }}
                    className={`mt-5 text-base ${
                      project.isPlaceholderLink
                        ? "cursor-not-allowed text-text-secondary/50"
                        : "text-accent hover:text-accent-hover"
                    }`}
                  >
                    {t.projects.viewLink} →
                  </a>
                )}
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
