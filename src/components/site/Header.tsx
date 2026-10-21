"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { site } from "@/config/site";
import { useTheme } from "@/components/ThemeProvider";
import { useBooking } from "./Booking";

export const navLinks = [
  { label: "Product", href: "#preview" },
  { label: "Customization", href: "#customization" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/vetos-mark.png" alt="" width={34} height={32} className="h-8 w-auto" />
      <span className="text-lg font-semibold tracking-tight text-fg">Vet<span className="text-brand">OS</span></span>
    </span>
  );
}

export default function Header() {
  const { openBooking } = useBooking();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled || open ? "border-b border-line bg-page/90 backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="VetOS home" className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"><Logo /></Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-soft transition-colors hover:text-fg">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.appUrl} className="hidden rounded-lg px-3 py-2 text-sm font-medium text-soft transition-colors hover:text-fg sm:inline-block">Sign In</a>
          <button
            type="button"
            onClick={() => openBooking("clinic")}
            className="rounded-lg bg-emerald-400 px-3.5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-300"
          >
            Book a Demo
          </button>
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
            className="rounded-lg border border-line2 p-2 text-fg hover:bg-hover"
          >
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-fg hover:bg-hover lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line px-4 pb-5 pt-2 lg:hidden">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-base text-fg hover:bg-hover">{l.label}</a>
              </li>
            ))}
            <li><a href={site.appUrl} className="block rounded-lg px-3 py-3 text-base text-fg hover:bg-hover">Sign In</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
