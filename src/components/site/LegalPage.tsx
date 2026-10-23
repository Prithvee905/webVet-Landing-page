import React from "react";
import { BookingProvider } from "./Booking";
import Header from "./Header";
import Footer from "./Footer";

export interface LegalSection {
  title: string;
  body: React.ReactNode;
}

/** Shared layout for plain-text pages such as Privacy and Terms. */
export default function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: LegalSection[] }) {
  return (
    <div className="min-h-screen bg-page text-fg">
      <BookingProvider>
        <Header />
        <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-faint">Last updated: {updated}</p>
          <div className="mt-10 space-y-6">
            {sections.map((s, i) => (
              <section key={s.title} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <h2 className="text-lg font-semibold">{i + 1}. {s.title}</h2>
                <div className="mt-3 text-sm leading-relaxed text-muted">{s.body}</div>
              </section>
            ))}
          </div>
        </main>
        <Footer />
      </BookingProvider>
    </div>
  );
}
