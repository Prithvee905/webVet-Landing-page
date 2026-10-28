"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useBooking } from "./Booking";
import ProductPreview from "./ProductPreview";
import Reveal from "./Reveal";

const words = ["clinic", "hospital"];

function Rotator() {
  const [i, setI] = useState(0);
  const [w, setW] = useState<number>();
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, []);
  // The box takes the width of the visible word, so "actually uses" never floats away from it.
  useEffect(() => { setW(refs.current[i]?.offsetWidth); }, [i]);
  return (
    <span className="rotator inline-grid align-bottom text-brand" style={{ width: w, transition: "width .5s ease" }}>
      {words.map((word, n) => (
        <span key={word} ref={(el) => { refs.current[n] = el; }} aria-hidden={n !== i} className="col-start-1 row-start-1 w-max" style={{ opacity: n === i ? 1 : 0, transform: n === i ? "none" : "translateY(10px)" }}>
          {word}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { openBooking } = useBooking();
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.18),transparent)]" />
      <div aria-hidden className="float-slow pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
      <div aria-hidden className="float-slow pointer-events-none absolute -right-24 top-80 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl [animation-delay:-4s]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="fade-in mb-5 text-sm font-medium uppercase tracking-widest text-brand">Veterinary clinic &amp; hospital software · India</p>
        <h1 className="fade-in text-balance text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
          <span className="block">Only the workflows</span>
          <span className="block">your <Rotator /> actually uses.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg">
          Most veterinary software is packed with features you never open, and still misses the one you need. VetOS is built around how your clinic works, with your branding, at a price that doesn&rsquo;t keep climbing.
        </p>
        <p className="mt-5 font-medium text-brand">Your clinic. Your workflow. Your software.</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => openBooking("clinic")} className="group inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-300">
            Book a Demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </button>
          <a href="#build" className="rounded-xl border border-line2 bg-page/60 px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-hover">
            Build your VetOS
          </a>
        </div>
        <dl className="mx-auto mt-12 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          <div className="lift rounded-xl border border-line bg-surface/90 p-4">
            <dt className="text-xs uppercase tracking-widest text-muted">Basic plan</dt>
            <dd className="mt-1 text-fg">From <span className="text-2xl font-semibold">₹4,999</span>/year · 24/7 support</dd>
          </div>
          <div className="lift rounded-xl border border-emerald-400/30 bg-surface/90 p-4">
            <dt className="text-xs uppercase tracking-widest text-brand">Enterprise</dt>
            <dd className="mt-1 text-fg">From <span className="text-2xl font-semibold">₹34,999</span> · customized · 24/7 support</dd>
          </div>
        </dl>
      </div>

      <Reveal className="relative mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <div id="preview" className="scroll-mt-20">
          <p className="mb-3 text-center text-sm text-muted">Try it: register a pet, write notes, prescribe, and print a branded invoice.</p>
          <ProductPreview />
        </div>
      </Reveal>
    </section>
  );
}
