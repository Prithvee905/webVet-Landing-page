export type ClinicRole = "doctor" | "reception" | "clinical_staff" | "owner";

export interface DemoBookingFormData {
  clinicName: string;
  contactPerson: string;
  email: string;
  phone: string;
  clinicSize: "Solo" | "2-5 Veterinarians" | "5+ Veterinarians";
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface TrialFormData {
  clinicName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  clinicType: "Single OPD Clinic" | "Multi-Doctor Hospital" | "24/7 Emergency & Inpatient" | "Mobile Pet Practice";
  termsAccepted: boolean;
}

export interface PatientQueueItem {
  id: string;
  tokenNumber: number;
  petName: string;
  species: "Dog" | "Cat" | "Exotic" | "Bird";
  breed: string;
  age: string;
  weight: string;
  ownerName: string;
  ownerPhone: string;
  chiefComplaint: string;
  status: "In Consultation" | "Waiting" | "Triage" | "Completed";
  waitingMinutes: number;
  assignedDoctor: string;
}
