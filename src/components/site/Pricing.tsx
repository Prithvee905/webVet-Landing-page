"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import Section from "./Section";
import { useBooking } from "./Booking";
import { Accordion, pricingFaq } from "./Faq";
import { inr, pricing } from "@/config/site";

const clinicIncludes = [
  "Pet and owner records",
  "Consultations with SOAP notes",
  "Prescriptions and GST-ready invoices",
  "Pharmacy and stock tracking",
  "Appointments, WhatsApp reminders and campaigns",
  "24/7 support",
  "Role-based access",
];
const enterpriseIncludes = [
  "Requirements-led customization",
  "Clinic-specific branding on documents",
  "Deployment arranged with you",
  "Agreed integrations",
  "Ongoing technical management as per agreement",
  "24/7 support",
];

export default function Pricing() {
  const { openBooking } = useBooking();
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Two ways to work with VetOS"
      intro="An affordable plan for individual clinics, and a quoted solution for hospitals."
    >
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
        <article className="lift flex flex-col rounded-2xl border border-line bg-surface p-8" aria-labelledby="plan-clinic">
          <h3 id="plan-clinic" className="text-sm font-medium uppercase tracking-widest text-muted">Basic</h3>
          <p className="mt-4 text-sm text-muted">Starts at</p>
          <p className="text-5xl font-semibold tracking-tight text-fg">{inr(pricing.clinic.from)}<span className="text-lg font-normal text-muted">/year</span></p>
          <p className="mt-1 text-sm text-muted">Approximately ₹{pricing.clinic.perDay}/day · 24/7 support</p>
          <p className="mt-4 text-sm text-soft">For individual veterinary clinics. {pricing.clinic.trialDays}-day free trial.</p>
          <ul className="mt-6 flex-1 space-y-2.5 text-sm text-soft">
            {clinicIncludes.map((i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />{i}</li>)}
          </ul>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <Link href="/trial" className="flex-1 rounded-xl bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-emerald-300">Start Free Trial</Link>
            <button type="button" onClick={() => openBooking("clinic")} className="flex-1 rounded-xl border border-line2 px-4 py-3 text-sm font-semibold text-fg hover:bg-hover">Book a Demo</button>
          </div>
        </article>

        <article className="lift flex flex-col rounded-2xl border border-emerald-400/40 bg-gradient-to-b from-emerald-500/10 to-surface p-8" aria-labelledby="plan-ent">
          <h3 id="plan-ent" className="text-sm font-medium uppercase tracking-widest text-brand">Enterprise</h3>
          <p className="mt-4 text-sm text-muted">Starts at</p>
          <p className="text-5xl font-semibold tracking-tight text-fg">{inr(pricing.enterprise.from)}</p>
          <p className="mt-1 text-sm text-muted">Custom quotation based on your requirements</p>
          <p className="mt-4 text-sm text-soft">For hospitals and practices that need customized workflows, branding, deployment, integrations and managed technical support.</p>
          <ul className="mt-6 flex-1 space-y-2.5 text-sm text-soft">
            {enterpriseIncludes.map((i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />{i}</li>)}
          </ul>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => openBooking("hospital")} className="flex-1 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-300">Discuss Your Requirements</button>
            <button type="button" onClick={() => openBooking("hospital")} className="flex-1 rounded-xl border border-line2 px-4 py-3 text-sm font-semibold text-fg hover:bg-hover">Book an Enterprise Demo</button>
          </div>
        </article>
      </div>

      <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-faint">
        Customization, additional integrations, hosting, messaging charges and ongoing support terms depend on the agreed package.
      </p>

      <div className="mx-auto mt-12 max-w-3xl">
        <h3 className="mb-4 text-lg font-semibold text-fg">Pricing questions</h3>
        <Accordion items={pricingFaq} />
      </div>
    </Section>
  );
}
