import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const SECTION_IDS = ["about", "now", "skills", "certifications", "projects", "contact"];

export function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems: { id: string; label: string }[] = [
    { id: "about", label: t.nav.about },
    { id: "now", label: t.nav.now },
    { id: "skills", label: t.nav.skills },
    { id: "certifications", label: t.nav.certifications },
    { id: "projects", label: t.nav.projects },
    { id: "contact", label: t.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-b border-border bg-bg/80 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-1.5">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex flex-shrink-0 items-center"
          aria-label="TatulBuilds — back to top"
        >
          <img src="/logo.png" alt="TatulBuilds" className="logo-img h-12 w-auto sm:h-16 lg:h-20" />
        </a>

        <nav className="hidden items-center gap-5 xl:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`relative whitespace-nowrap text-base transition-colors hover:text-warm ${
                activeId === item.id ? "text-warm" : "text-text-secondary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden flex-shrink-0 items-center gap-5 xl:flex">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-text"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-bg px-6 py-5 xl:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-lg ${activeId === item.id ? "text-warm" : "text-text-secondary"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-5">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
