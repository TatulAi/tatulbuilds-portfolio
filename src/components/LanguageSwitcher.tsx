import { useLanguage } from "../context/LanguageContext";
import { languageLabels, type Lang } from "../i18n/translations";

const LANGS: Lang[] = ["en", "sk", "am"];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-base" role="group" aria-label="Language switcher">
      {LANGS.map((code, i) => (
        <span key={code} className="flex items-center">
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`rounded px-1.5 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
              lang === code ? "text-accent" : "text-text-secondary hover:text-accent"
            }`}
          >
            {languageLabels[code]}
          </button>
          {i < LANGS.length - 1 && <span className="text-border">/</span>}
        </span>
      ))}
    </div>
  );
}
