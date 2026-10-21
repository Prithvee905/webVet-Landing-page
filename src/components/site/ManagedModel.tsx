import React from "react";
import { Info } from "lucide-react";
import Section from "./Section";
import { transparency } from "@/config/site";

const steps = [
  ["Share your requirements", "You explain how your clinic or hospital works today."],
  ["Agree the scope", "We agree on features and customization, and put the quotation in writing."],
  ["Configure and brand", "The software is set up and branded for your practice."],
  ["Hosting and integrations", "Hosting and any agreed integrations are set up."],
  ["Onboarding and training", "Your team is shown how to use the system."],
  ["Ongoing support", "Technical support according to your agreement."],
];

export default function ManagedModel() {
  return (
    <Section
      id="how-it-works"
      eyebrow="Hospital / Enterprise"
      title="A managed model: you run the clinic, we run the technology"
      intro="For hospitals and larger practices, VetOS is delivered as a customized solution rather than a one-size-fits-all subscription."
    >
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map(([t, d], i) => (
          <li key={t} className="lift rounded-2xl border border-line bg-surface p-6">
            <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/40 text-sm font-semibold text-brand">{i + 1}</span>
            <h3 className="font-medium text-fg">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 rounded-2xl border border-line bg-alt p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-fg">Transparency: hosting, ownership and costs</h3>
        <p className="mt-2 flex gap-2 text-sm text-warn"><Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> These terms are set per project. Where an answer says &ldquo;to be agreed&rdquo;, it is confirmed in writing before you commit.</p>
        <dl className="mt-6 grid gap-6 md:grid-cols-2">
          {transparency.map((t) => (
            <div key={t.q}>
              <dt className="font-medium text-fg">{t.q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{t.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
