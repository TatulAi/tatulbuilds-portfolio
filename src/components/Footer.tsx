import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center text-base text-text-secondary sm:flex-row sm:justify-between sm:text-left">
        <p>
          © {year} {t.footer.rights}
        </p>
        <button type="button" onClick={scrollToTop} className="transition-colors hover:text-accent">
          {t.footer.backToTop}
        </button>
      </div>
    </footer>
  );
}
