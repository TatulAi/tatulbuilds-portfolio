import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// TODO: drop the real CV file at public/cv-placeholder.pdf (or update CV_PATH)
// once it's ready. The button below checks for the file at runtime and
// automatically enables itself — no code change needed once the file exists.
const CV_PATH = "/cv-placeholder.pdf";

export function CvDownloadButton() {
  const { t } = useLanguage();
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(CV_PATH, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!available) {
    return (
      <span
        className="cursor-not-allowed text-base text-text-secondary/60"
        title={t.hero.ctaSecondaryComingSoon}
        aria-disabled="true"
      >
        {t.hero.ctaSecondary}
      </span>
    );
  }

  return (
    <a href={CV_PATH} download className="text-base text-text-secondary transition-colors hover:text-accent">
      {t.hero.ctaSecondary}
    </a>
  );
}
