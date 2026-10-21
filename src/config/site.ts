/**
 * Single source of truth for commercial terms, contact points and feature status.
 * Anything marked CONFIRM has not been verified against the product or a signed
 * commercial agreement and should be reviewed before launch.
 */

export const site = {
  name: "VetOS",
  url: "https://vetosclinic.com",
  appUrl: "https://app.vetosclinic.com",
  supportEmail: "motivebuilders@gmail.com",
  privacyEmail: "motivebuilders@gmail.com",
  /**
   * Lead capture endpoint (demo / trial / enterprise requests). When unset, forms
   * validate locally and show an honest "integration pending" state with an email
   * fallback instead of pretending a request was sent.
   */
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "/api/lead",
} as const;

export const pricing = {
  clinic: {
    from: 4999,
    period: "year",
    perDay: "13.70",
    trialDays: 7,
  },
  enterprise: {
    from: 34999, // CONFIRM: no billing period is stated on purpose.
  },
} as const;

export const inr = (n: number) => `₹${new Intl.NumberFormat("en-IN").format(n)}`;

export type FeatureStatus = "available" | "by-arrangement" | "planned";

export interface Feature {
  title: string;
  body: string;
  status: FeatureStatus;
}

/** CONFIRM: statuses mirror what the previous site documented; re-verify against the product. */
export const features: Feature[] = [
  { title: "Pet & owner records", body: "One longitudinal record per patient, linked to the owner and visit history.", status: "available" },
  { title: "Consultation management", body: "Token-based queue from reception to the doctor's desk.", status: "available" },
  { title: "SOAP notes & templates", body: "Subjective, objective, assessment and plan in a structured note, with templates you can reuse.", status: "available" },
  { title: "Prescription generation", body: "Build a prescription during the consultation. The vet's registration number prints on it.", status: "available" },
  { title: "GST-ready invoices & printing", body: "GST-ready invoices and print-ready prescriptions, in full-page or compact receipt size. VetOS is software only; printers are not supplied.", status: "available" },
  { title: "Pharmacy & stock", body: "In-house medicine stock with batch and expiry tracking.", status: "available" },
  { title: "Owner analytics", body: "Collections and consultation counts for the person running the clinic.", status: "available" },
  { title: "Role-based permissions", body: "Separate access for reception, doctors, staff and owners.", status: "available" },
  { title: "Appointments", body: "Pet owners can book appointments online, and your team can book at the front desk. Reschedule and track them alongside the walk-in queue.", status: "available" },
  { title: "WhatsApp invoices", body: "Send invoices from the clinic's own number and Meta Business account, once configured. Meta messaging charges apply.", status: "available" },
  { title: "WhatsApp reminders", body: "Appointment and vaccination reminders to pet owners, sent from your own WhatsApp number once configured.", status: "available" },
  { title: "WhatsApp campaigns", body: "Broadcast offers and health-camp announcements to your owners. Requires your Meta Business setup; Meta charges apply.", status: "available" },
  { title: "Lab & diagnostics", body: "Lab integration, with lab reports and imaging attached to the patient record.", status: "available" },
  { title: "OPD, surgery, grooming & boarding", body: "Run outpatient visits, surgeries, grooming and boarding from the same system.", status: "available" },
  { title: "Multi-branch", body: "Manage more than one branch of your clinic or hospital.", status: "available" },
  { title: "Import your records", body: "We can help bring existing patient and owner records across from a spreadsheet. Scope is agreed per clinic.", status: "available" },
  { title: "Works in any browser", body: "Web-based, so there is nothing to install. Open it from any browser, including on a phone. There is no separate mobile app.", status: "available" },
  { title: "Hospital & inpatient workflows", body: "Admissions, kennels and inpatient charting for hospitals.", status: "available" },
];

export const statusLabel: Record<FeatureStatus, string> = {
  available: "Available",
  "by-arrangement": "On configuration",
  planned: "Planned",
};

/** CONFIRM: hosting, ownership and support terms are placeholders until finalised commercially. */
export const transparency = [
  { q: "Where is the software hosted?", a: "Decided per project and written into your agreement. The hosting region and provider are named before work begins.", pending: true },
  { q: "Who owns and controls the cloud account?", a: "To be agreed per project. We will state in writing whether the account sits in your name or ours, and who holds administrator access.", pending: true },
  { q: "What credentials and documentation are shared?", a: "To be agreed per project. The list of shared credentials and infrastructure documents is set out in your package.", pending: true },
  { q: "Which recurring costs apply?", a: "Hosting and WhatsApp (Meta) messaging charges depend on your setup and usage and are listed in your quotation. They are not bundled into the starting price.", pending: false },
  { q: "What support and maintenance is included?", a: "Defined by the agreement for your package. We do not promise lifetime hosting or maintenance.", pending: true },
];
