import type { Metadata } from "next";
import { BookingProvider } from "@/components/site/Booking";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Documentation | VetOS",
  description: "A plain-language guide to how VetOS works: daily workflow, appointments, billing, WhatsApp, branding, branches and support.",
};

interface Doc {
  id: string;
  title: string;
  intro: string;
  items: string[];
}

const docs: Doc[] = [
  {
    id: "getting-started",
    title: "Getting started",
    intro: "VetOS is web-based, so there is nothing to install.",
    items: [
      "Open VetOS in any modern browser, including on a phone or tablet. There is no separate mobile app.",
      "The VetOS team sets up your workspace, your branding and your users before you begin.",
      "Your clinic's team members are given separate roles, such as reception, doctor, staff and owner, each with their own access.",
      "Existing patient and owner records can be imported from a spreadsheet. What can be imported is agreed with you per clinic.",
    ],
  },
  {
    id: "daily-workflow",
    title: "A day in the clinic",
    intro: "The usual path of a visit, from the front desk to the bill.",
    items: [
      "Reception registers the pet and owner, or finds the existing record, and adds the visit to the queue.",
      "The doctor opens the patient from the queue and writes the consultation as a SOAP note: subjective, objective, assessment and plan. Reusable templates speed this up.",
      "The doctor builds the prescription during the consultation. The vet's registration number prints on it.",
      "Billing creates a GST-ready invoice from the visit and the medicines given.",
      "The prescription and invoice can be printed or sent to the owner on WhatsApp.",
    ],
  },
  {
    id: "appointments",
    title: "Appointments and the queue",
    intro: "Walk-ins and booked visits sit together.",
    items: [
      "Pet owners can book appointments online, and your team can book at the front desk.",
      "Appointments can be rescheduled and tracked alongside the walk-in queue.",
      "Owners can receive appointment and vaccination reminders on WhatsApp.",
    ],
  },
  {
    id: "clinical-care",
    title: "Clinical work",
    intro: "Everything that happens around a consultation.",
    items: [
      "One record per pet, linked to the owner and the visit history.",
      "OPD visits, surgeries, grooming and boarding are handled in the same system.",
      "Lab integration, with lab reports and imaging attached to the patient record.",
      "Hospital and inpatient workflows for admissions, kennels and charting.",
    ],
  },
  {
    id: "billing",
    title: "Invoices and printing",
    intro: "Documents carry your clinic's identity.",
    items: [
      "Invoices are GST-ready.",
      "Prescriptions and invoices print in full-page or compact receipt size.",
      "Your clinic's name, logo, headers and footer text appear on printed documents. The exact branding options depend on your package.",
      "VetOS is software only. The clinic supplies its own printers.",
    ],
  },
  {
    id: "pharmacy",
    title: "Pharmacy and stock",
    intro: "Keep track of what is on the shelf.",
    items: [
      "In-house medicine stock with batch and expiry tracking.",
      "Medicines from the prescription flow into the invoice.",
    ],
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    intro: "Messages go out from your own number.",
    items: [
      "WhatsApp invoices, reminders and campaigns run through your clinic's own number and Meta Business account, once the VetOS team has configured it.",
      "Campaigns let you send offers or health-camp announcements to a chosen group of owners.",
      "Meta's messaging charges are billed by Meta based on your usage. They are not part of the VetOS price.",
      "Third-party elements such as the WhatsApp interface itself cannot be re-branded.",
    ],
  },
  {
    id: "teams",
    title: "Branches, roles and reports",
    intro: "For clinics that are growing.",
    items: [
      "Multi-branch support lets you manage more than one branch of a clinic or hospital.",
      "Role-based permissions control who can see and do what.",
      "Owner analytics show collections and consultation counts for the person running the clinic.",
    ],
  },
  {
    id: "good-to-know",
    title: "Good to know",
    intro: "A few things VetOS does not do.",
    items: [
      "VetOS is software only. Printers and other hardware are not supplied.",
      "Online payment collection is not part of VetOS.",
      "There is no separate mobile app. VetOS works in the browser.",
      "Telemedicine (video consultations) is not available.",
    ],
  },
  {
    id: "support",
    title: "Support",
    intro: "24/7 support for every VetOS customer.",
    items: [
      `Email ${site.supportEmail} and the VetOS team will reply.`,
      "Enterprise customers also have support and technical management terms set out in their agreement.",
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-page text-fg">
      <BookingProvider>
        <Header />
        <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
          <header className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand">Documentation</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">How VetOS works</h1>
            <p className="mt-4 text-lg leading-relaxed text-soft">
              A plain-language guide to what VetOS does and how a clinic uses it. For anything not covered here, email us and we will help.
            </p>
          </header>

          <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr]">
            <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-faint">On this page</p>
              <ul className="space-y-1 border-l border-line">
                {docs.map((d) => (
                  <li key={d.id}>
                    <a href={`#${d.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted transition-colors hover:border-emerald-400 hover:text-fg">
                      {d.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-6">
              {docs.map((d) => (
                <section key={d.id} id={d.id} aria-labelledby={`${d.id}-h`} className="scroll-mt-24 rounded-2xl border border-line bg-surface p-6 sm:p-8">
                  <h2 id={`${d.id}-h`} className="text-2xl font-semibold tracking-tight">{d.title}</h2>
                  <p className="mt-2 text-soft">{d.intro}</p>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                    {d.items.map((i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </BookingProvider>
    </div>
  );
}
