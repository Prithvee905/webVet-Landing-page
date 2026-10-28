"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Header";
import { useBooking } from "./Booking";
import { site } from "@/config/site";

const link = "text-sm text-muted transition-colors hover:text-fg";

export default function Footer() {
  const { openBooking } = useBooking();
  return (
    <footer className="border-t border-line bg-page">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">Your clinic. Your workflow. Your software.</p>
        </div>
        <nav aria-label="Product">
          <h2 className="mb-3 text-sm font-medium text-fg">Product</h2>
          <ul className="space-y-2">
            <li><Link className={link} href="/#product">Product tour</Link></li>
            <li><Link className={link} href="/#features">Features</Link></li>
            <li><Link className={link} href="/#customization">Customization</Link></li>
            <li><Link className={link} href="/#pricing">Pricing</Link></li>
          </ul>
        </nav>
        <nav aria-label="Contact">
          <h2 className="mb-3 text-sm font-medium text-fg">Get in touch</h2>
          <ul className="space-y-2">
            <li><button type="button" className={link} onClick={() => openBooking("clinic")}>Book a demo</button></li>
            <li><button type="button" className={link} onClick={() => openBooking("hospital")}>Enterprise inquiries</button></li>
            <li><a className={link} href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a></li>
          </ul>
        </nav>
        <nav aria-label="Resources">
          <h2 className="mb-3 text-sm font-medium text-fg">Resources</h2>
          <ul className="space-y-2">
            <li><Link className={link} href="/docs">Documentation</Link></li>
            <li><Link className={link} href="/privacy">Privacy Policy</Link></li>
            <li><Link className={link} href="/terms">Terms of Service</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line px-4 py-6 text-center text-xs text-faint">
        Interface previews on this site use fictional data. © VetOS
      </div>
    </footer>
  );
}
