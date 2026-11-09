import { useLanguage } from "../context/LanguageContext";
import { projectsMeta } from "../i18n/projects";
import { GlowCard } from "./ui/glow-card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const VOICE_WIDGET_SCRIPT_ID = "elevenlabs-convai-script";

// Loaded on first click only; the DOM checks keep repeat clicks from adding a second widget.
function loadVoiceWidget(agentId: string) {
  if (!document.getElementById(VOICE_WIDGET_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = VOICE_WIDGET_SCRIPT_ID;
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.onerror = () => script.remove(); // allow a retry on the next click
    document.body.appendChild(script);
  }

  if (!document.querySelector("elevenlabs-convai")) {
    const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", agentId);
    document.body.appendChild(widget);
  }
}

export function Projects() {
  const { t } = useLanguage();

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
                      onClick={() => loadVoiceWidget(project.demoAgentId)}
                      className="mt-5 cursor-pointer self-start text-left text-base text-accent hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {t.projects.tryDemo} →
                    </button>
                    <p className="mt-2 text-sm text-text-secondary">{t.projects.demoHint}</p>
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
