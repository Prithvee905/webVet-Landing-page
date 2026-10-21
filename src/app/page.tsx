import { BookingProvider } from "@/components/site/Booking";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Problem from "@/components/site/Problem";
import FeaturePicker from "@/components/site/FeaturePicker";
import ProductTour from "@/components/site/ProductTour";
import BrandingConfigurator from "@/components/site/BrandingConfigurator";
import ManagedModel from "@/components/site/ManagedModel";
import Features from "@/components/site/Features";
import Pricing from "@/components/site/Pricing";
import Faq from "@/components/site/Faq";
import Footer from "@/components/site/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-page text-fg">
      <BookingProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-emerald-400 focus:px-4 focus:py-2 focus:text-slate-950">
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Hero />
          <Problem />
          <FeaturePicker />
          <BrandingConfigurator />
          <ProductTour />
          <ManagedModel />
          <Features />
          <Pricing />
          <Faq />
        </main>
        <Footer />
      </BookingProvider>
    </div>
  );
}
