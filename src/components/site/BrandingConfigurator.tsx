"use client";

import React, { useEffect, useRef, useState } from "react";
import Section from "./Section";
import { useBooking } from "./Booking";

const swatches = ["#10B981", "#2563EB", "#9333EA", "#E11D48", "#EA580C"];
const field = "w-full rounded-md border border-line bg-page px-3 py-2 text-sm text-fg focus:border-emerald-400 focus:outline-none";

interface Brand { name: string; initials: string; color: string; invoiceHeader: string; rxHeader: string; footer: string; logo?: string }

function Doc({ brand, kind, generic }: { brand: Brand; kind: "Invoice" | "Prescription"; generic?: boolean }) {
  const name = generic ? "Generic Vet Software" : brand.name || "Your Clinic";
  const color = generic ? "#64748B" : brand.color;
  const initials = generic ? "GV" : (brand.initials || name.slice(0, 2)).slice(0, 3).toUpperCase();
  const header = generic ? `${kind} · Powered by vendor` : kind === "Invoice" ? brand.invoiceHeader : brand.rxHeader;
  const footer = generic ? "Vendor name and branding appear here." : brand.footer;
  return (
    <div className="rounded-lg bg-white p-4 text-[11px] text-slate-800 shadow-lg">
      <div className="flex items-center gap-2 border-b-2 pb-2" style={{ borderColor: color }}>
        {!generic && brand.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={brand.logo} alt="" className="h-8 w-8 rounded object-contain" />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded text-xs font-bold text-[#fff]" style={{ background: color }} aria-hidden>{initials}</span>
        )}
        <div className="min-w-0">
          <p className="truncate font-bold">{name}</p>
          <p className="truncate text-[10px] text-faint">{header}</p>
        </div>
      </div>
      <div className="space-y-1.5 py-3">
        <p>Patient: <b>Biscuit</b> (Dog)</p>
        {kind === "Invoice" ? (
          <>
            <div className="flex justify-between"><span>Consultation</span><span>₹500</span></div>
            <div className="flex justify-between"><span>Medicines</span><span>₹390</span></div>
            <div className="flex justify-between border-t pt-1 font-bold" style={{ color }}><span>Total</span><span>₹890</span></div>
          </>
        ) : (
          <>
            <p>1. Amoxicillin 250mg: twice daily, 5 days</p>
            <p>2. Oral rehydration salts: as directed</p>
          </>
        )}
      </div>
      <p className="border-t pt-2 text-center text-[10px] text-faint">{footer}</p>
    </div>
  );
}

export default function BrandingConfigurator() {
  const { openBooking } = useBooking();
  const [b, setB] = useState<Brand>({
    name: "Sunrise Animal Hospital", initials: "SA", color: swatches[0],
    invoiceHeader: "Tax Invoice", rxHeader: "Prescription", footer: "Thank you for trusting us with your pet.",
  });
  const [logoError, setLogoError] = useState("");
  const logoRef = useRef<string | undefined>(undefined);
  useEffect(() => () => { if (logoRef.current) URL.revokeObjectURL(logoRef.current); }, []);
  const setLogo = (url?: string) => {
    if (logoRef.current) URL.revokeObjectURL(logoRef.current);
    logoRef.current = url;
    setB((p) => ({ ...p, logo: url }));
  };
  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(file.type)) return setLogoError("Choose a PNG, JPG, WebP or SVG image.");
    if (file.size > 2 * 1024 * 1024) return setLogoError("Choose an image under 2 MB.");
    setLogoError("");
    setLogo(URL.createObjectURL(file));
  };
  const [kind, setKind] = useState<"Invoice" | "Prescription">("Invoice");
  const set = (k: keyof Brand) => (e: React.ChangeEvent<HTMLInputElement>) => setB({ ...b, [k]: e.target.value });

  return (
    <Section
      id="customization"
      eyebrow="White-label customization"
      title="Your name on every document"
      intro="Change the fields to see how a VetOS-powered solution can carry your clinic's identity. The clinic name here is fictional."
      tone="alt"
    >
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <form className="space-y-4 rounded-2xl border border-line bg-surface p-5" onSubmit={(e) => e.preventDefault()}>
          <div><label htmlFor="br-name" className="mb-1 block text-xs text-muted">Clinic name</label><input id="br-name" className={field} value={b.name} maxLength={40} onChange={set("name")} /></div>
          <div>
            <label htmlFor="br-logo" className="mb-1 block text-xs text-muted">Your logo (optional)</label>
            <input id="br-logo" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={onLogo}
              className="block w-full text-xs text-muted file:mr-3 file:rounded-md file:border-0 file:bg-emerald-400 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-slate-950 hover:file:bg-emerald-300" />
            {b.logo && <button type="button" onClick={() => setLogo(undefined)} className="mt-2 text-xs text-brand underline">Remove logo</button>}
            <p className={`mt-1 text-[11px] ${logoError ? "text-danger" : "text-faint"}`} role={logoError ? "alert" : undefined}>{logoError || "Stays in your browser. It is not uploaded."}</p>
          </div>
          <div><label htmlFor="br-ini" className="mb-1 block text-xs text-muted">Logo initials (up to 3)</label><input id="br-ini" className={field} value={b.initials} maxLength={3} onChange={set("initials")} /></div>
          <fieldset>
            <legend className="mb-1 text-xs text-muted">Accent color</legend>
            <div className="flex gap-2">
              {swatches.map((c) => (
                <button key={c} type="button" aria-label={`Accent ${c}`} aria-pressed={b.color === c} onClick={() => setB({ ...b, color: c })}
                  className={`h-8 w-8 rounded-full ring-offset-2 ring-offset-surface ${b.color === c ? "ring-2 ring-fg" : ""}`} style={{ background: c }} />
              ))}
            </div>
          </fieldset>
          <div><label htmlFor="br-inv" className="mb-1 block text-xs text-muted">Invoice header</label><input id="br-inv" className={field} value={b.invoiceHeader} maxLength={40} onChange={set("invoiceHeader")} /></div>
          <div><label htmlFor="br-rx" className="mb-1 block text-xs text-muted">Prescription header</label><input id="br-rx" className={field} value={b.rxHeader} maxLength={40} onChange={set("rxHeader")} /></div>
          <div><label htmlFor="br-ft" className="mb-1 block text-xs text-muted">Footer text</label><input id="br-ft" className={field} value={b.footer} maxLength={70} onChange={set("footer")} /></div>
        </form>

        <div>
          <div role="group" aria-label="Document type" className="mb-4 flex gap-1">
            {(["Invoice", "Prescription"] as const).map((k) => (
              <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)} className={`rounded-lg px-4 py-2 text-sm font-medium ${kind === k ? "bg-active text-fg" : "text-muted hover:text-fg"}`}>{k}</button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2" aria-live="polite">
            <figure><figcaption className="mb-2 text-xs font-medium uppercase tracking-wider text-faint">Before: generic software</figcaption><Doc brand={b} kind={kind} generic /></figure>
            <figure><figcaption className="mb-2 text-xs font-medium uppercase tracking-wider text-brand">After: your clinic</figcaption><Doc brand={b} kind={kind} /></figure>
          </div>
          <p className="mt-5 rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-muted">
            This is an illustration. Final branding capabilities depend on the package you purchase and how it is implemented. We do not claim that every third-party component, such as WhatsApp messages, login screens or URLs, can be white-labelled; we will confirm what is supported for your setup.
          </p>
          <button type="button" onClick={() => openBooking("hospital")} className="mt-4 rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-300">Discuss your branding</button>
        </div>
      </div>
    </Section>
  );
}
