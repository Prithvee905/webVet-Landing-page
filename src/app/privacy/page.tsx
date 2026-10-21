"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
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
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Privacy & Clinical Data Governance
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Last updated: October 2026 • Practice Data Stewardship
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-6 shadow-sm">
          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">1. Practice Ownership of Patient Records</h2>
            <p>
              All patient medical histories, clinical notes, diagnostics, and owner contact details entered into VetOS remain the exclusive property of the subscribing clinic or hospital. VetOS does not sell or commercially monetize clinical patient data.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">2. Role-Based Internal Access Control</h2>
            <p>
              VetOS enforces strict segregation within practice accounts. Financial metrics, total collections, and owner profit margins are shielded from staff members assigned clinical, nursing, or receptionist roles.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">3. Data Residency and Cloud Encryption</h2>
            <p>
              Tenant data is isolated in secure cloud database clusters. All data transmission between clinic browsers and our services is encrypted via Transport Layer Security (TLS 1.3).
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">4. Communications & Messaging</h2>
            <p>
              When clinics activate automated WhatsApp or SMS appointment reminders, client phone numbers and pet appointment dates are dispatched strictly to fulfill those notifications via authorized telecommunications channels.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">5. Inquiries & Data Portability</h2>
            <p>
              Clinics may request export archives of their patient EMR records at any time by contacting{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">motivebuilders@gmail.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
