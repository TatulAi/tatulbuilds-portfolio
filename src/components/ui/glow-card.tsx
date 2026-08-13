import { useRef, type HTMLAttributes } from "react";

export function GlowCard({ className = "", onMouseMove, onMouseLeave, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`border-glow ${className}`}
      onMouseMove={(e) => {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          el.style.setProperty("--rotation", `${Math.atan2(y, x)}rad`);
        }
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        ref.current?.style.setProperty("--rotation", "0deg");
        onMouseLeave?.(e);
      }}
      {...props}
    />
  );
}
