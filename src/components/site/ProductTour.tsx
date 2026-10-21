"use client";

import React, { useRef, useState } from "react";
import { Boxes, ClipboardPlus, MessageCircle, Receipt, Stethoscope, TrendingUp } from "lucide-react";
import Section from "./Section";
import { inr } from "@/config/site";

type TabId = "reception" | "doctor" | "messaging" | "billing" | "pharmacy" | "owner";

const tabs: { id: TabId; label: string; Icon: typeof Receipt; points: string[] }[] = [
  { id: "reception", label: "Reception", Icon: ClipboardPlus, points: ["Find an existing owner or pet in seconds", "Check patients in and keep the waiting queue in order", "Hand the doctor a ready record"] },
  { id: "doctor", label: "Consultation", Icon: Stethoscope, points: ["Structured SOAP notes with quick phrases", "Build the prescription as you consult", "Complete the visit and pass it to billing"] },
  { id: "messaging", label: "WhatsApp", Icon: MessageCircle, points: ["Appointment and vaccination reminders", "Campaigns to a chosen group of owners", "Sent from your own WhatsApp number"] },
  { id: "billing", label: "Billing", Icon: Receipt, points: ["Itemised invoice with quantity and discount", "Print as a full page or a compact receipt", "Record the payment mode"] },
  { id: "pharmacy", label: "Pharmacy", Icon: Boxes, points: ["Stock by batch with expiry dates", "Dispensing reduces stock", "Low-stock and near-expiry flags"] },
  { id: "owner", label: "Owner view", Icon: TrendingUp, points: ["Collections and visit counts at a glance", "Switch between time ranges", "Built for the person running the clinic"] },
];

const box = "rounded-xl border border-line bg-page p-4";
const inp = "rounded-md border border-line bg-surface px-2.5 py-2 text-sm text-fg placeholder-slate-500 focus:border-emerald-400 focus:outline-none";

export default function ProductTour() {
  const [active, setActive] = useState<TabId>("reception");
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const current = tabs.find((t) => t.id === active)!;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? (i + 1) % tabs.length : e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(tabs[next].id);
    refs.current[tabs[next].id]?.focus();
  };

  return (
    <Section id="product" eyebrow="Product tour" title="One workflow, from the front desk to the owner's report" intro="Try each screen. Everything below runs in your browser with made-up data.">
      <div role="tablist" aria-label="Product areas" className="mx-auto mb-6 flex max-w-4xl gap-1 overflow-x-auto rounded-xl border border-line bg-surface p-1">
        {tabs.map(({ id, label, Icon }, i) => (
          <button
            key={id}
            ref={(el) => { refs.current[id] = el; }}
            role="tab"
            id={`tour-tab-${id}`}
            aria-selected={active === id}
            aria-controls={`tour-panel-${id}`}
            tabIndex={active === id ? 0 : -1}
            onClick={() => setActive(id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${active === id ? "bg-active text-fg" : "text-muted hover:text-fg"}`}
          >
            <Icon className="h-4 w-4" aria-hidden /> {label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`tour-panel-${active}`} aria-labelledby={`tour-tab-${active}`} className="grid gap-8 rounded-2xl border border-line bg-surface p-5 sm:p-8 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h3 className="text-xl font-semibold text-fg">{current.label}</h3>
          <ul className="mt-4 space-y-3 text-sm text-soft">
            {current.points.map((p) => (
              <li key={p} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />{p}</li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-faint">Simulated interface with fictional data.</p>
        </div>
        <div key={active} className="fade-in min-w-0">
          {active === "reception" && <Reception />}
          {active === "doctor" && <Doctor />}
          {active === "messaging" && <Messaging />}
          {active === "billing" && <Billing />}
          {active === "pharmacy" && <Pharmacy />}
          {active === "owner" && <Owner />}
        </div>
      </div>
    </Section>
  );
}

function Reception() {
  const [q, setQ] = useState("");
  const [list, setList] = useState([
    { name: "Biscuit", detail: "Dog · Meera Nair", in: false },
    { name: "Mochi", detail: "Cat · Arjun Rao", in: true },
    { name: "Tango", detail: "Dog · Farah Khan", in: false },
    { name: "Pepper", detail: "Cat · Dev Malhotra", in: false },
  ]);
  const shown = list.filter((p) => `${p.name} ${p.detail}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className={box}>
      <label htmlFor="rc-search" className="sr-only">Search patients or owners</label>
      <input id="rc-search" className={`${inp} w-full`} placeholder="Search pet or owner…" value={q} onChange={(e) => setQ(e.target.value)} />
      <ul className="mt-3 divide-y divide-line">
        {shown.map((p) => (
          <li key={p.name} className="flex items-center justify-between py-2.5 text-sm">
            <span><span className="font-medium text-fg">{p.name}</span> <span className="text-muted">{p.detail}</span></span>
            <button type="button" aria-pressed={p.in} onClick={() => setList(list.map((x) => x.name === p.name ? { ...x, in: !x.in } : x))}
              className={`rounded-md px-3 py-1 text-xs font-medium ${p.in ? "bg-emerald-400/15 text-brand" : "border border-line2 text-fg hover:bg-hover"}`}>
              {p.in ? "Checked in" : "Check in"}
            </button>
          </li>
        ))}
        {shown.length === 0 && <li className="py-4 text-sm text-faint">No match.</li>}
      </ul>
      <p className="mt-3 text-xs text-muted" aria-live="polite">{list.filter((p) => p.in).length} waiting in queue</p>
    </div>
  );
}

function Doctor() {
  const phrases = ["Appetite reduced", "Temp 102°F", "Mild dehydration", "Review in 3 days"];
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className={box}>
      <label htmlFor="dr-note" className="mb-1 block text-xs text-muted">Clinical note (SOAP)</label>
      <textarea id="dr-note" rows={4} className={`${inp} w-full`} value={note} onChange={(e) => { setNote(e.target.value); setDone(false); }} placeholder="Tap a phrase or type…" />
      <div className="mt-2 flex flex-wrap gap-2">
        {phrases.map((p) => (
          <button key={p} type="button" onClick={() => { setNote((n) => (n ? `${n}\n` : "") + p); setDone(false); }} className="rounded-full border border-line2 px-3 py-1 text-xs text-fg hover:bg-hover">+ {p}</button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted" aria-live="polite">{done ? "Consultation completed. Passed to billing." : "In consultation"}</span>
        <button type="button" disabled={!note.trim()} onClick={() => setDone(true)} className="rounded-md bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-40">Complete consultation</button>
      </div>
    </div>
  );
}

function Billing() {
  const [items, setItems] = useState([{ n: "Consultation", p: 500, q: 1 }, { n: "Amoxicillin 250mg", p: 180, q: 1 }, { n: "Probiotic sachets", p: 210, q: 1 }]);
  const [disc, setDisc] = useState(0);
  const [fmt, setFmt] = useState<"Full page" | "Receipt">("Full page");
  const [pay, setPay] = useState("UPI");
  const sub = items.reduce((t, i) => t + i.p * i.q, 0);
  const total = Math.round(sub * (1 - disc / 100));
  const bump = (n: string, d: number) => setItems(items.map((i) => (i.n === n ? { ...i, q: Math.max(0, i.q + d) } : i)));
  return (
    <div className={box}>
      <ul className="space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.n} className="flex items-center justify-between">
            <span className="text-fg">{i.n}</span>
            <span className="flex items-center gap-2">
              <button type="button" aria-label={`Decrease ${i.n}`} onClick={() => bump(i.n, -1)} className="h-6 w-6 rounded border border-line2 text-soft hover:bg-hover">−</button>
              <span className="w-4 text-center tabular-nums">{i.q}</span>
              <button type="button" aria-label={`Increase ${i.n}`} onClick={() => bump(i.n, 1)} className="h-6 w-6 rounded border border-line2 text-soft hover:bg-hover">+</button>
              <span className="w-16 text-right tabular-nums text-soft">{inr(i.p * i.q)}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="text-xs text-muted">Discount %
          <input type="number" min={0} max={100} className={`${inp} mt-1 w-full`} value={disc} onChange={(e) => setDisc(Math.min(100, Math.max(0, Number(e.target.value) || 0)))} />
        </label>
        <label className="text-xs text-muted">Payment
          <select className={`${inp} mt-1 w-full`} value={pay} onChange={(e) => setPay(e.target.value)}><option>UPI</option><option>Cash</option><option>Card</option></select>
        </label>
        <fieldset className="text-xs text-muted"><legend>Print format</legend>
          <div className="mt-1 flex gap-1">
            {(["Full page", "Receipt"] as const).map((f) => (
              <button key={f} type="button" aria-pressed={fmt === f} onClick={() => setFmt(f)} className={`flex-1 rounded-md border px-2 py-2 text-sm ${fmt === f ? "border-emerald-400 bg-emerald-400/10 text-fg" : "border-line text-soft"}`}>{f}</button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm">
        <span className="text-xs text-muted">{fmt} · {pay}</span>
        <span className="font-semibold text-fg tabular-nums" aria-live="polite">Total {inr(total)}</span>
      </div>
    </div>
  );
}

function Pharmacy() {
  const [stock, setStock] = useState([
    { n: "Amoxicillin 250mg", batch: "A-2231", exp: "Mar 2027", qty: 42 },
    { n: "Meloxicam oral", batch: "M-1180", exp: "Dec 2026", qty: 6 },
    { n: "ORS sachets", batch: "O-0904", exp: "Aug 2027", qty: 120 },
  ]);
  const [lowOnly, setLowOnly] = useState(false);
  const shown = stock.filter((s) => !lowOnly || s.qty <= 10);
  return (
    <div className={box}>
      <label className="mb-3 flex items-center gap-2 text-xs text-soft">
        <input type="checkbox" checked={lowOnly} onChange={(e) => setLowOnly(e.target.checked)} className="accent-emerald-400" /> Show low stock only (10 or fewer)
      </label>
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-faint"><tr><th className="pb-2 font-medium">Item</th><th className="pb-2 font-medium">Batch / expiry</th><th className="pb-2 text-right font-medium">Qty</th><th className="pb-2"><span className="sr-only">Action</span></th></tr></thead>
        <tbody className="divide-y divide-line">
          {shown.map((s) => (
            <tr key={s.batch}>
              <td className="py-2.5 text-fg">{s.n}</td>
              <td className="py-2.5 text-xs text-muted">{s.batch} · {s.exp}</td>
              <td className={`py-2.5 text-right tabular-nums ${s.qty <= 10 ? "text-warn" : "text-fg"}`}>{s.qty}{s.qty <= 10 && <span className="ml-1 text-[10px]">low</span>}</td>
              <td className="py-2.5 text-right">
                <button type="button" disabled={s.qty === 0} onClick={() => setStock(stock.map((x) => x.batch === s.batch ? { ...x, qty: x.qty - 1 } : x))} className="rounded-md border border-line2 px-2.5 py-1 text-xs text-fg hover:bg-hover disabled:opacity-40">Dispense 1</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ranges = {
  "Today": { visits: 28, collected: 21400, bars: [2, 4, 6, 5, 7, 4] },
  "7 days": { visits: 171, collected: 128900, bars: [22, 30, 27, 33, 29, 30] },
  "30 days": { visits: 702, collected: 541200, bars: [160, 175, 190, 177] },
} as const;

function Owner() {
  const [r, setR] = useState<keyof typeof ranges>("Today");
  const d = ranges[r];
  const max = Math.max(...d.bars);
  return (
    <div className={box}>
      <div role="group" aria-label="Time range" className="mb-4 flex gap-1">
        {(Object.keys(ranges) as (keyof typeof ranges)[]).map((k) => (
          <button key={k} type="button" aria-pressed={r === k} onClick={() => setR(k)} className={`rounded-md px-3 py-1.5 text-xs font-medium ${r === k ? "bg-active text-fg" : "text-muted hover:text-fg"}`}>{k}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><p className="text-xs text-muted">Visits</p><p className="text-2xl font-semibold tabular-nums text-fg">{d.visits}</p></div>
        <div><p className="text-xs text-muted">Collected</p><p className="text-2xl font-semibold tabular-nums text-fg">{inr(d.collected)}</p></div>
      </div>
      <div className="mt-5 flex h-24 items-end gap-2" role="img" aria-label={`Visits trend for ${r}`}>
        {d.bars.map((b, i) => <div key={i} className="flex-1 rounded-t bg-emerald-400/70 transition-all duration-300" style={{ height: `${(b / max) * 100}%` }} />)}
      </div>
    </div>
  );
}

const templates = {
  "Appointment reminder": "Hi {owner}, this is a reminder for {pet}'s appointment tomorrow at 11:30 AM at Sunrise Animal Hospital.",
  "Vaccination due": "Hi {owner}, {pet}'s annual vaccination is due this week. Reply to book a slot.",
  "Campaign": "Hi {owner}, we are running a free health check-up camp this Saturday. Bring {pet} along!",
} as const;
const audiences = { "All owners": 240, "Dog owners": 150, "Cat owners": 70, "Due this week": 18 } as const;

function Messaging() {
  const [kind, setKind] = useState<keyof typeof templates>("Appointment reminder");
  const [text, setText] = useState<string>(templates["Appointment reminder"]);
  const [aud, setAud] = useState<keyof typeof audiences>("Due this week");
  const [queued, setQueued] = useState(false);
  const preview = text.replace("{owner}", "Meera").replace("{pet}", "Biscuit");
  return (
    <div className={box}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-muted">Message type
          <select className={`${inp} mt-1 w-full`} value={kind} onChange={(e) => { const k = e.target.value as keyof typeof templates; setKind(k); setText(templates[k]); setQueued(false); }}>
            {Object.keys(templates).map((k) => <option key={k}>{k}</option>)}
          </select>
        </label>
        <label className="text-xs text-muted">Send to
          <select className={`${inp} mt-1 w-full`} value={aud} onChange={(e) => { setAud(e.target.value as keyof typeof audiences); setQueued(false); }}>
            {Object.keys(audiences).map((k) => <option key={k}>{k}</option>)}
          </select>
        </label>
      </div>
      <label htmlFor="wa-text" className="mt-3 block text-xs text-muted">Message (use {"{owner}"} and {"{pet}"})</label>
      <textarea id="wa-text" rows={3} className={`${inp} mt-1 w-full`} value={text} onChange={(e) => { setText(e.target.value); setQueued(false); }} />
      <div className="mt-3 rounded-xl bg-emerald-500/10 p-3 text-sm text-fg" aria-live="polite"><span className="mb-1 block text-[10px] uppercase tracking-wider text-faint">Preview</span>{preview}</div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs text-muted" aria-live="polite">{queued ? "Simulated only: nothing is sent from this website." : `${audiences[aud]} owners in this group (sample)`}</span>
        <button type="button" onClick={() => setQueued(true)} className="rounded-md bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-300">Schedule (preview)</button>
      </div>
    </div>
  );
}
