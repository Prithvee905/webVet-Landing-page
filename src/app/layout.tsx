import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vetosclinic.com"),
  title: "VetOS | Veterinary software that works the way your clinic does",
  description:
    "Veterinary clinic and hospital management software for India. Start with an affordable Basic plan from ₹4,999/year, or an Enterprise white-label solution for your hospital.",
  keywords: [
    "veterinary software india",
    "vet practice management software",
    "veterinary clinic ERP",
    "pet clinic billing software india",
    "veterinary SOAP records",
    "animal hospital management system",
    "veterinary inventory software",
  ],
  authors: [{ name: "VetOS Clinical Technologies" }],
  openGraph: {
    title: "VetOS | Your clinic. Your workflow. Your software.",
    description:
      "Patient records, consultations, prescriptions and billing, with clinic-specific branding and managed setup for veterinary hospitals.",
    url: "https://vetosclinic.com",
    siteName: "VetOS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "VetOS | Your clinic. Your workflow. Your software.",
    description:
      "Veterinary clinic and hospital software with clinic-specific branding and managed setup.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("vetos-theme");var d=t==="dark"||((!t||t==="system")&&matchMedia("(prefers-color-scheme: dark)").matches);var c=document.documentElement.classList;c.add(d?"dark":"light");c.remove(d?"light":"dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-700 dark:selection:text-emerald-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
