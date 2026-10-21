"use client";

import React, { useState } from "react";
import { ClipboardList, FileText, Pill, Receipt, Stethoscope, UserPlus, Plus, Trash2, Printer } from "lucide-react";
import { inr } from "@/config/site";

type Step = "register" | "consult" | "rx" | "invoice" | "pdf";
interface Patient { id: number; token: number; name: string; species: string; owner: string; complaint: string }

const MEDS = [
  { id: "amox", name: "Amoxicillin 250mg, 5 days", price: 180 },
  { id: "meloxi", name: "Meloxicam oral, 3 days", price: 140 },
  { id: "ors", name: "Oral rehydration salts", price: 60 },
  { id: "probio", name: "Probiotic sachets, 7 days", price: 210 },
];
const CONSULT_FEE = 500;
const CLINIC = "Greenleaf Pet Clinic";

const seed: Patient[] = [
  { id: 1, token: 12, name: "Biscuit", species: "Dog", owner: "Meera Nair", complaint: "Vomiting since last night" },
  { id: 2, token: 13, name: "Mochi", species: "Cat", owner: "Arjun Rao", complaint: "Limping, left hind leg" },
];

const steps: { id: Step; label: string; Icon: typeof FileText }[] = [
  { id: "register", label: "Register", Icon: UserPlus },
  { id: "consult", label: "Consult", Icon: Stethoscope },
  { id: "rx", label: "Prescribe", Icon: Pill },
  { id: "invoice", label: "Invoice", Icon: Receipt },
  { id: "pdf", label: "PDF", Icon: FileText },
];

const input = "w-full rounded-md border border-line bg-page px-2.5 py-2 text-sm text-fg placeholder-slate-500 focus:border-emerald-400 focus:outline-none";

export default function ProductPreview() {
  const [patients, setPatients] = useState(seed);
  const [selected, setSelected] = useState(1);
  const [step, setStep] = useState<Step>("consult");
  const [notes, setNotes] = useState<Record<number, { s: string; o: string; a: string; p: string }>>({
    1: { s: "Vomiting twice since last night, eating less.", o: "Temp 102.4°F, mild dehydration.", a: "Suspected gastroenteritis.", p: "Oral meds, bland diet, review in 3 days." },
  });
  const [rx, setRx] = useState<Record<number, string[]>>({ 1: ["ors"] });
  const [form, setForm] = useState({ name: "", species: "Dog", owner: "", complaint: "" });

  const patient = patients.find((p) => p.id === selected) ?? patients[0];
  const note = notes[patient.id] ?? { s: "", o: "", a: "", p: "" };
  const meds = (rx[patient.id] ?? []).map((id) => MEDS.find((m) => m.id === id)!);
  const total = CONSULT_FEE + meds.reduce((t, m) => t + m.price, 0);

  const register = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.owner.trim()) return;
    const id = Math.max(...patients.map((p) => p.id)) + 1;
    const token = Math.max(...patients.map((p) => p.token)) + 1;
    setPatients([...patients, { id, token, ...form, name: form.name.trim(), owner: form.owner.trim(), complaint: form.complaint.trim() || "General check-up" }]);
    setSelected(id);
    setForm({ name: "", species: "Dog", owner: "", complaint: "" });
    setStep("consult");
  };

  const setNote = (k: "s" | "o" | "a" | "p", v: string) => setNotes({ ...notes, [patient.id]: { ...note, [k]: v } });
  const addMed = (id: string) => id && !(rx[patient.id] ?? []).includes(id) && setRx({ ...rx, [patient.id]: [...(rx[patient.id] ?? []), id] });
  const delMed = (id: string) => setRx({ ...rx, [patient.id]: (rx[patient.id] ?? []).filter((m) => m !== id) });

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs text-soft">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500 text-[10px] font-bold text-slate-950" aria-hidden>G</span>
          {CLINIC}
        </div>
        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-warn">
          Product preview · simulated data
        </span>
      </div>

      <div className="grid md:grid-cols-[200px_1fr]">
        {/* Queue */}
        <div className="border-b border-line p-3 md:border-b-0 md:border-r">
          <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
            <ClipboardList className="h-3.5 w-3.5" aria-hidden /> Consultation queue
          </h3>
          <ul className="flex gap-2 overflow-x-auto md:block md:space-y-1.5 md:overflow-visible">
            {patients.map((p) => (
              <li key={p.id} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={p.id === patient.id}
                  onClick={() => { setSelected(p.id); if (step === "register") setStep("consult"); }}
                  className={`w-36 rounded-lg border px-2.5 py-2 text-left text-xs transition-colors md:w-full ${p.id === patient.id ? "border-emerald-400/60 bg-emerald-400/10" : "border-line hover:bg-hover"}`}
                >
                  <span className="flex justify-between font-medium text-fg">{p.name}<span className="text-muted">#{p.token}</span></span>
                  <span className="block truncate text-muted">{p.species} · {p.owner}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Workspace */}
        <div className="min-w-0 p-4">
          <div role="tablist" aria-label="Preview steps" className="mb-4 flex gap-1 overflow-x-auto rounded-lg bg-page p-1">
            {steps.map(({ id, label, Icon }) => (
              <button
                key={id}
                role="tab"
                id={`pv-tab-${id}`}
                aria-selected={step === id}
                aria-controls="pv-panel"
                onClick={() => setStep(id)}
                className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${step === id ? "bg-active text-fg" : "text-muted hover:text-fg"}`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden /> {label}
              </button>
            ))}
          </div>

          <div role="tabpanel" id="pv-panel" aria-labelledby={`pv-tab-${step}`} className="min-h-[300px] text-sm">
            {step === "register" && (
              <form onSubmit={register} className="grid gap-3 sm:grid-cols-2">
                <p className="text-xs text-muted sm:col-span-2">Register a fictional patient. It joins the queue on the left.</p>
                <label className="text-xs text-soft">Pet name<input className={`${input} mt-1`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
                <label className="text-xs text-soft">Species
                  <select className={`${input} mt-1`} value={form.species} onChange={(e) => setForm({ ...form, species: e.target.value })}>
                    <option>Dog</option><option>Cat</option><option>Other</option>
                  </select>
                </label>
                <label className="text-xs text-soft">Owner<input className={`${input} mt-1`} value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} required /></label>
                <label className="text-xs text-soft">Complaint<input className={`${input} mt-1`} value={form.complaint} onChange={(e) => setForm({ ...form, complaint: e.target.value })} /></label>
                <button className="rounded-md bg-emerald-400 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300 sm:col-span-2">Add to queue</button>
              </form>
            )}

            {step === "consult" && (
              <div className="space-y-3">
                <p className="text-xs text-muted"><span className="font-medium text-fg">{patient.name}</span> · {patient.complaint}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {([["s", "Subjective"], ["o", "Objective"], ["a", "Assessment"], ["p", "Plan"]] as const).map(([k, label]) => (
                    <label key={k} className="text-xs text-soft">{label}
                      <textarea rows={3} className={`${input} mt-1`} value={note[k]} onChange={(e) => setNote(k, e.target.value)} />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === "rx" && (
              <div className="space-y-3">
                <label className="block text-xs text-soft">Add medicine
                  <select className={`${input} mt-1`} value="" onChange={(e) => addMed(e.target.value)}>
                    <option value="">Select…</option>
                    {MEDS.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </label>
                {meds.length === 0 && <p className="text-xs text-faint">No medicines added for {patient.name}.</p>}
                <ul className="space-y-1.5">
                  {meds.map((m) => (
                    <li key={m.id} className="flex items-center justify-between rounded-md border border-line px-3 py-2">
                      <span>{m.name}</span>
                      <button type="button" onClick={() => delMed(m.id)} aria-label={`Remove ${m.name}`} className="rounded p-1 text-muted hover:text-danger"><Trash2 className="h-4 w-4" aria-hidden /></button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {step === "invoice" && (
              <div className="space-y-2">
                <div className="flex justify-between border-b border-line pb-2 text-xs text-muted"><span>Item</span><span>Amount</span></div>
                <div className="flex justify-between"><span>Consultation</span><span>{inr(CONSULT_FEE)}</span></div>
                {meds.map((m) => <div key={m.id} className="flex justify-between text-soft"><span>{m.name}</span><span>{inr(m.price)}</span></div>)}
                <div className="flex justify-between border-t border-line pt-2 font-semibold text-fg"><span>Total</span><span>{inr(total)}</span></div>
                <p className="pt-2 text-[11px] text-faint">Sample prices for illustration only. Taxes are not modelled in this preview.</p>
              </div>
            )}

            {step === "pdf" && (
              <div>
                <div className="mx-auto max-w-sm rounded bg-white p-4 text-[11px] text-slate-800 shadow-lg">
                  <div className="mb-2 flex items-center gap-2 border-b-2 border-emerald-500 pb-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-emerald-500 font-bold text-[#fff]" aria-hidden>G</span>
                    <div><p className="font-bold">{CLINIC}</p><p className="text-[9px] text-faint">Invoice & prescription · sample</p></div>
                  </div>
                  <p className="mb-1">Patient: <b>{patient.name}</b> ({patient.species}) · Owner: {patient.owner}</p>
                  <p className="mb-1 text-slate-600">Assessment: {note.a || "—"}</p>
                  <ul className="mb-2 list-disc pl-4">{meds.map((m) => <li key={m.id}>{m.name}</li>)}{meds.length === 0 && <li>No medicines</li>}</ul>
                  <p className="border-t pt-1 text-right font-bold">Total {inr(total)}</p>
                </div>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-faint"><Printer className="h-3 w-3" aria-hidden /> Sample document rendered in your browser. Nothing is saved or sent.</p>
              </div>
            )}
          </div>
          <button type="button" onClick={() => setStep("register")} className="mt-2 inline-flex items-center gap-1 text-xs text-brand hover:text-brand"><Plus className="h-3 w-3" aria-hidden /> Register another patient</button>
        </div>
      </div>
    </div>
  );
}
