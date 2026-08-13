import { useLanguage } from "../context/LanguageContext";
import { CvDownloadButton } from "./CvDownloadButton";

export function Hero() {
  const { t } = useLanguage();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="flex min-h-screen items-center px-6 pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-base font-medium tracking-wide text-warm">{t.hero.eyebrow}</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">{t.hero.greeting}</h1>
        <p className="mt-7 max-w-2xl text-lg text-text-secondary sm:text-xl">{t.hero.subtext}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <button
            type="button"
            onClick={scrollToContact}
            className="rounded-full bg-cta-bg px-7 py-3 text-base font-medium text-cta-text transition-colors hover:bg-cta-bg-hover hover:text-cta-text-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            {t.hero.ctaPrimary}
          </button>
          <CvDownloadButton />
        </div>
      </div>
    </section>
  );
}
