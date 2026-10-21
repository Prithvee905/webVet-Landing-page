"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Stethoscope, Printer, Boxes } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">

      <div className="relative max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to VetOS Overview
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              VetOS Clinical Documentation
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Operational guides and architecture reference for veterinary teams.
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-emerald-500" />
              1. SOAP Clinical Record Standard
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
              VetOS enforces standard veterinary SOAP charting:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pl-2">
              <li><strong>Subjective (S):</strong> Chief complaint, symptom duration, diet history reported by pet parent.</li>
              <li><strong>Objective (O):</strong> Measured vitals (Temp in °F, Heart Rate, Respiratory Rate, CRT, Mucous Membranes).</li>
              <li><strong>Assessment (A):</strong> Provisional or definitive diagnosis, differential diagnoses.</li>
              <li><strong>Plan (P):</strong> Administered injectables, pharmacy prescription, client dietary advice, review date.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Printer className="w-5 h-5 text-emerald-500" />
              2. Dual Printing Setup (A4 & 80mm ESC/POS)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              VetOS supports both standard laser desktop printers and compact USB/Ethernet thermal receipt printers:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pl-2">
              <li><strong>A4 Laser Output:</strong> Formatted for official hospital letterheads with VCI/State registration details.</li>
              <li><strong>80mm Thermal Receipts:</strong> Uses ESC/POS standard formatting with 576 dots per line, itemized GST tax rate summaries, and instant UPI QR payments.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Boxes className="w-5 h-5 text-emerald-500" />
              3. Pharmacy Auto-decrement
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              When a veterinarian completes a consultation, medications designated as in-house clinic stock decrement automatically from the active batch with the earliest expiry date (FEFO - First Expired, First Out).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
