import React from "react";
import Section from "./Section";
import { features, statusLabel, type FeatureStatus } from "@/config/site";

const tone: Record<FeatureStatus, string> = {
  available: "border-emerald-400/30 bg-emerald-400/10 text-brand",
  "by-arrangement": "border-sky-400/30 bg-sky-400/10 text-info",
  planned: "border-slate-400/30 bg-slate-400/10 text-soft",
};

export default function Features() {
  return (
    <Section
      id="features"
      eyebrow="Features"
      title="What VetOS covers"
      intro="Each capability is labelled so you know what is available today, what depends on configuration, and what is still planned."
      tone="alt"
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <li key={f.title} className="lift flex flex-col rounded-2xl border border-line bg-surface p-6">
            <span className={`mb-4 w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tone[f.status]}`}>{statusLabel[f.status]}</span>
            <h3 className="font-medium text-fg">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
