import React from "react";
import { Scissors, Puzzle, Wallet, Paintbrush } from "lucide-react";
import Section from "./Section";

const points = [
  { Icon: Scissors, title: "Only what you use", body: "No wall of modules to wade through. Your screens carry the features your team works with every day, nothing else." },
  { Icon: Puzzle, title: "What you're missing, built", body: "Need something your current software never offered? Hospitals can have custom functionality built for an additional agreed fee." },
  { Icon: Wallet, title: "A price you can plan around", body: "Basic: from ₹4,999 a year with 24/7 support. Enterprise: from ₹34,999 on a quotation. Extra costs are written down up front, not discovered later." },
  { Icon: Paintbrush, title: "Your name on your paperwork", body: "Invoices, prescriptions and customer messages carry your clinic's branding, and WhatsApp can run from your own number once configured." },
];

export default function Problem() {
  return (
    <Section
      id="why"
      eyebrow="Why VetOS"
      title="Software shaped around your clinic, not the other way round"
      intro="Plenty of clinic software tries to do everything for everyone. VetOS does what your practice needs, and the VetOS team takes care of the technical side."
    >
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
        {points.map(({ Icon, title, body }) => (
          <div key={title} className="lift rounded-2xl border border-line bg-surface/95 p-6">
            <Icon className="mb-4 h-5 w-5 text-brand" aria-hidden />
            <h3 className="text-lg font-medium text-fg">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-soft">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
