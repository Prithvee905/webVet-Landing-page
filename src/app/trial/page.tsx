"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ShieldCheck,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Check,
} from "lucide-react";
import { TrialFormData } from "@/types";
import { submitLead, mailtoFallback, type LeadResult } from "@/lib/lead";
import { site } from "@/config/site";

export default function TrialPage() {
  const [formData, setFormData] = useState<TrialFormData>({
    clinicName: "",
    ownerName: "",
    email: "",
    phone: "",
    city: "",
    state: "Karnataka",
    clinicType: "Single OPD Clinic",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clinicName.trim()) {
      newErrors.clinicName = "Clinic name is required";
    }
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Chief veterinarian / owner name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    const cleanPhone = formData.phone.replace(/[\s\-+]/g, "");
    const indianRegex = /^(91)?[6789]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!indianRegex.test(cleanPhone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.termsAccepted) {
      newErrors.terms = "You must accept the terms of trial use";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [result, setResult] = useState<LeadResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const r = await submitLead("trial", { ...formData });
    setIsSubmitting(false);
    setResult(r);
    setIsSuccess(r.status !== "error");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">

      <div className="relative max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to VetOS Overview
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Description Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                <Activity className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight">VetOS</span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-500/20">
                Sandbox
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Start Your 7-Day Free Clinic Trial
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Test drive VetOS in an isolated sandbox environment configured for your practice workflows.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>Full access to SOAP consultation templates & dosage formulas</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>Print-ready prescriptions and invoices</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>No credit card required • Zero commitment</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 shadow-sm">
              <span className="text-slate-900 dark:text-slate-200 font-semibold block mb-1">
                Pricing Baseline After Trial:
              </span>
              Clinic Plan starts at <strong className="text-emerald-600 dark:text-emerald-400">₹4,999/year</strong> (~₹13.70/day). You can cancel at any time during the trial.
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Practice Registration Details
                </h2>

                <div>
                  <label htmlFor="clinicName" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Clinic / Hospital Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      id="clinicName"
                      type="text"
                      placeholder="e.g. Cessna Pet Hospital"
                      value={formData.clinicName}
                      onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border ${
                        errors.clinicName ? "border-rose-500" : "border-slate-300 dark:border-slate-700"
                      } rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition`}
                    />
                  </div>
                  {errors.clinicName && (
                    <p className="text-rose-500 text-xs mt-1">{errors.clinicName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="ownerName" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Chief Veterinarian / Owner Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      id="ownerName"
                      type="text"
                      placeholder="Dr. Rajesh Kumar"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border ${
                        errors.ownerName ? "border-rose-500" : "border-slate-300 dark:border-slate-700"
                      } rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition`}
                    />
                  </div>
                  {errors.ownerName && (
                    <p className="text-rose-500 text-xs mt-1">{errors.ownerName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        id="email"
                        type="email"
                        placeholder="rajesh@vetclinic.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border ${
                          errors.email ? "border-rose-500" : "border-slate-300 dark:border-slate-700"
                        } rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-rose-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      WhatsApp Number (India) *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 98450 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border ${
                          errors.phone ? "border-rose-500" : "border-slate-300 dark:border-slate-700"
                        } rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-rose-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      City *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        id="city"
                        type="text"
                        placeholder="Bengaluru"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border ${
                          errors.city ? "border-rose-500" : "border-slate-300 dark:border-slate-700"
                        } rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition`}
                      />
                    </div>
                    {errors.city && (
                      <p className="text-rose-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      State
                    </label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
                    >
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Other">Other State</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="clinicType" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Practice Scope
                    </label>
                    <select
                      id="clinicType"
                      value={formData.clinicType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          clinicType: e.target.value as TrialFormData["clinicType"],
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
                    >
                      <option value="Single OPD Clinic">Single OPD Clinic</option>
                      <option value="Multi-Doctor Hospital">Multi-Doctor</option>
                      <option value="24/7 Emergency & Inpatient">24/7 Inpatient</option>
                      <option value="Mobile Pet Practice">Mobile Practice</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      I agree to the trial terms of use and acknowledge that tenant authentication credentials will be verified during clinic onboarding.
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-rose-500 text-xs mt-1">{errors.terms}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>Request 7-Day Free Trial</>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {result?.status === "sent" ? "Trial request sent" : "Trial request not sent yet"}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  {result?.status === "sent"
                    ? <>We received the request for <strong className="text-slate-900 dark:text-white">{formData.clinicName}</strong>. No workspace exists until the VetOS team contacts you.</>
                    : <>Your details for <strong className="text-slate-900 dark:text-white">{formData.clinicName}</strong> are valid, but online trial signup is not connected yet, so nothing has been submitted.</>}
                </p>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-left text-xs text-slate-600 dark:text-slate-400 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{result?.status === "sent" ? "What happens next" : "Integration pending"}</span>
                  </div>
                  <p>
                    {result?.status === "sent"
                      ? "A VetOS team member will get in touch using the details below."
                      : <>Please email your request to <a className="underline" href={mailtoFallback(`VetOS trial request: ${formData.clinicName}`, { Clinic: formData.clinicName, Name: formData.ownerName, Email: formData.email, Phone: formData.phone, City: formData.city })}>{site.supportEmail}</a> and we will reply.</>}
                  </p>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800">
                    Contact: {formData.ownerName} • {formData.email} • {formData.phone}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/"
                    className="inline-block px-6 py-2.5 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
