import React from "react";
import { ChevronDown } from "lucide-react";
import Section from "./Section";
import { inr, pricing, site } from "@/config/site";

export interface QA { q: string; a: string }

export function Accordion({ items }: { items: QA[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {items.map((it) => (
        <details key={it.q} className="group px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-fg marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 [&::-webkit-details-marker]:hidden">
            {it.q}
            <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-muted">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

export const pricingFaq: QA[] = [
  { q: "Are there fees beyond the starting price?", a: "Possibly. The starting prices cover the base offering. Customization, extra integrations, hosting and WhatsApp messaging charges depend on the agreed package and are stated in your quotation." },
  { q: "Who pays for hosting?", a: "Hosting arrangements and any cost are confirmed in writing for your plan or project before you commit. For Enterprise they are agreed per project." },
  { q: "Are WhatsApp messages included?", a: "No. WhatsApp runs through your own number and Meta Business account once configured, and Meta's messaging charges are billed by Meta based on your usage." },
  { q: "What support is included?", a: "Every VetOS customer, on both the Basic and Enterprise plans, gets 24/7 support. Technical management terms for Enterprise are defined in the agreement you sign. We do not promise lifetime hosting or maintenance." },
  { q: "How is customization priced?", a: `Enterprise starts at ${inr(pricing.enterprise.from)}. Additional custom functionality is quoted separately once we understand your requirements.` },
];

const faq: QA[] = [
  { q: "What is VetOS?", a: "Veterinary clinic and hospital management software covering patient records, consultations, prescriptions, billing and day-to-day clinic operations, with setup and ongoing management support from our team." },
  { q: "Is VetOS suitable for small clinics?", a: `Yes. The Basic plan starts at ${inr(pricing.clinic.from)} per year and is designed for individual clinics, with a ${pricing.clinic.trialDays}-day free trial and 24/7 support.` },
  { q: "Can the software be customized?", a: "Yes, under the Enterprise plan. Workflows, branding and integrations are agreed with you, and custom functionality is available for an additional agreed fee." },
  { q: "Can invoices and prescriptions carry our branding?", a: "Yes, your clinic's name, logo and headers can appear on invoices and prescriptions. The exact branding options depend on your package." },
  { q: "Can we use our own WhatsApp number?", a: "WhatsApp communication can be set up through your own number and Meta Business account when configured. Meta's messaging charges apply." },
  { q: "Who manages hosting?", a: "This is agreed per project and put in writing. The VetOS team handles setup, deployment and ongoing technical management as defined in your agreement." },
  { q: "Who owns the infrastructure account?", a: "To be agreed per project. We state clearly, before you commit, whether the cloud account is in your name and who holds administrator access." },
  { q: "What does the Basic plan include?", a: "Patient and owner records, consultations, SOAP notes, prescriptions, GST-ready invoices, appointments, WhatsApp reminders and campaigns, pharmacy and stock, role-based access and 24/7 support. See the pricing section for the full list." },
  { q: "How does enterprise pricing work?", a: `It starts at ${inr(pricing.enterprise.from)} and is a custom quotation based on your requirements. We do not publish a fixed billing period because it depends on the package.` },
  { q: "Are maintenance, hosting and customization included?", a: "That depends on the agreed package. Each is stated explicitly in your quotation so there are no surprises." },
  { q: "Do you supply printers or other hardware?", a: "No. VetOS is software only. Prescriptions and invoices are print-ready for standard printers, which your clinic buys separately." },
  { q: "Do I need to install anything, or is there a mobile app?", a: "Nothing to install. VetOS is web-based, so you open it in any browser, including on a phone. There is no separate mobile app." },
  { q: "Can we bring our existing patient records?", a: "We can help import patient and owner records from a spreadsheet. What can be imported is agreed with you per clinic." },
  { q: "How can we book a demo?", a: `Use the Book a Demo button, or email ${site.supportEmail}.` },
];

export default function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Practical questions, plain answers" tone="alt">
      <div className="mx-auto max-w-3xl"><Accordion items={faq} /></div>
    </Section>
  );
}
