import React from "react";
import Reveal from "./Reveal";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  tone?: "base" | "alt";
}

export default function Section({ id, eyebrow, title, intro, children, tone = "base" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={`relative scroll-mt-16 overflow-hidden py-20 sm:py-28 ${tone === "alt" ? "bg-alt" : ""}`}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand">{eyebrow}</p>}
            <h2 id={id ? `${id}-title` : undefined} className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2>
            {intro && <p className="mt-4 text-pretty text-base leading-relaxed text-soft sm:text-lg">{intro}</p>}
          </div>
        </Reveal>
        <Reveal delay={120}>{children}</Reveal>
      </div>
    </section>
  );
}
