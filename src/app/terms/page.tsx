import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | VetOS",
  description: "The terms for using VetOS, including the free trial, clinical responsibility and what is included.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 2026"
      sections={[
        {
          title: "What VetOS is",
          body: "VetOS provides practice management, documentation, billing and pharmacy tools for veterinary clinics and hospitals. The software does not provide medical diagnoses or replace the clinical judgment of licensed veterinary practitioners registered with the Veterinary Council of India (VCI) or a state council.",
        },
        {
          title: "Prescriptions and dispensing",
          body: "Veterinarians using VetOS remain responsible for checking drug dosages and contraindications, and for following applicable drug schedules, before issuing prescriptions or dispensing medicines.",
        },
        {
          title: "Seven-day free trial",
          body: "The seven-day trial lets a practice try the Clinic plan without payment. The VetOS team sets up your trial after you request it, and contacts you using the details you provided.",
        },
        {
          title: "Software only",
          body: "VetOS is software. Printers and other hardware are not supplied. Charges from third parties, such as Meta's WhatsApp messaging charges, are billed by those providers and are not part of the VetOS price.",
        },
        {
          title: "Hospital / Enterprise packages",
          body: "Customization, hosting, integrations and ongoing support for Hospital / Enterprise customers are set out in the agreement for that package.",
        },
      ]}
    />
  );
}
