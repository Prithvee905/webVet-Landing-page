"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">

      <div className="relative max-w-3xl mx-auto space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to VetOS Overview
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Provisional Clinical Terms • Active Staging Architecture
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-6 shadow-sm">
          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">1. Clinical Software Scope</h2>
            <p>
              VetOS provides practice management, documentation tools, and inventory assistance. The software does not provide medical diagnoses or replace the clinical judgment of licensed veterinary practitioners registered with the Veterinary Council of India (VCI) or state councils.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">2. Prescription & Drug Dispensing Responsibility</h2>
            <p>
              Veterinarians using VetOS remain exclusively responsible for verifying drug dosages, contraindications, and adhering to applicable drug schedules prior to issuing prescriptions or dispensing medications.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">3. Seven-Day Free Trial Conditions</h2>
            <p>
              The seven-day trial allows practice evaluation without payment obligation. Trial environments may operate with simulated messaging gateways until commercial onboarding is completed.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">4. Brand & Trademark Notice</h2>
            <p>
              The name &ldquo;VetOS&rdquo; is a provisional clinical software brand. All trademarks, service marks, and trade names are the property of their respective holders and subject to official regulatory clearance in India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
