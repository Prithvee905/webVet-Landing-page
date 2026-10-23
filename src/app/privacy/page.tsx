import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | VetOS",
  description: "How VetOS handles clinic data, patient records and the details you send us.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2026"
      sections={[
        {
          title: "Your clinic owns its records",
          body: "All patient medical histories, clinical notes, diagnostics and owner contact details entered into VetOS remain the property of the subscribing clinic or hospital. VetOS does not sell clinical patient data.",
        },
        {
          title: "Access inside your clinic",
          body: "VetOS uses role-based access. Financial figures such as total collections are visible to owners and are not shown to other staff roles.",
        },
        {
          title: "Encryption in transit",
          body: "Data travelling between your browser and VetOS is encrypted using Transport Layer Security (TLS 1.3).",
        },
        {
          title: "WhatsApp messages",
          body: "When your clinic turns on WhatsApp invoices, reminders or campaigns, owners' phone numbers and appointment details are used only to send those messages through your clinic's WhatsApp Business account.",
        },
        {
          title: "Details you send through this website",
          body: "When you book a demo or request a trial, the name, email, phone number and clinic details you enter are emailed to the VetOS team and used only to respond to your request.",
        },
        {
          title: "Export and questions",
          body: (
            <>
              Clinics may request an export of their patient records at any time. For that, or any privacy question, email{" "}
              <a className="font-medium text-brand underline" href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.
            </>
          ),
        },
      ]}
    />
  );
}
