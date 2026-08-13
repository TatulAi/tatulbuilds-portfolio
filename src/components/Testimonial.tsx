import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

interface TestimonialData {
  quote: string;
  author: string;
  role: string;
}

// TODO: once a real client testimonial is available, set this to
// { quote: "...", author: "...", role: "..." } — the placeholder
// state below will be replaced automatically.
const testimonial: TestimonialData | null = null;

export function Testimonial() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <svg
            className="mx-auto mb-6 text-warm"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.17 6C4.87 8.1 3.5 10.9 3.5 14.1c0 3 2 5.4 4.6 5.4 2.3 0 4-1.8 4-4 0-2-1.4-3.6-3.3-3.9-.2 0-.4-.1-.4-.3 0-1.5 1.4-3.3 3.4-4.5L9.9 5C9 5.3 8.1 5.6 7.17 6zm10 0c-2.3 2.1-3.67 4.9-3.67 8.1 0 3 2 5.4 4.6 5.4 2.3 0 4-1.8 4-4 0-2-1.4-3.6-3.3-3.9-.2 0-.4-.1-.4-.3 0-1.5 1.4-3.3 3.4-4.5L19.9 5c-.9.3-1.8.6-2.73 1z" />
          </svg>
          {testimonial ? (
            <>
              <p className="text-xl text-text">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-4 text-base text-text-secondary">
                {testimonial.author} — {testimonial.role}
              </p>
            </>
          ) : (
            <p className="text-lg italic text-text-secondary/70">{t.testimonial.placeholder}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
