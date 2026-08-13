interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
}

export function SectionHeading({ eyebrow, heading }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-base font-medium tracking-wide text-warm">{eyebrow}</p>
      <h2 className="text-3xl font-semibold sm:text-4xl">{heading}</h2>
    </div>
  );
}
