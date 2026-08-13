import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={t.skills.eyebrow} heading={t.skills.heading} />
        </Reveal>
        <div className="grid gap-10 md:grid-cols-3">
          {t.skills.categories.map((category, i) => (
            <Reveal key={category.title} delay={i * 80}>
              <h3 className="mb-4 text-base font-medium text-text-secondary">{category.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {category.items.map((item) => (
                  <li key={item} className="text-base text-text">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
