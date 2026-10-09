import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="flex min-h-screen items-center px-6 pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <a
            href="#now"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("now")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-lg sm:rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden="true" className="h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
            <span>{t.hero.nowBadge} →</span>
          </a>
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
          </div>
        </div>
        <img
          src="/tatul-photo.jpg"
          alt="Tatul Ghazaryan"
          className="h-56 w-56 flex-shrink-0 rounded-full border border-border object-cover sm:h-72 sm:w-72 lg:h-80 lg:w-80"
        />
      </div>
    </section>
  );
}
