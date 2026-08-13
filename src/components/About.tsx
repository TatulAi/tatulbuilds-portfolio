import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={t.about.eyebrow} heading={t.about.heading} />
        </Reveal>
        <div className="space-y-5">
          {t.about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="text-lg text-text-secondary">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
