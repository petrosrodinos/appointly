import { Navigation } from "./components/navigation";
import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { PricingSection } from "./components/pricing-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { FaqSection } from "./components/faq-section";
import { CtaSection } from "./components/cta-section";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header>
        <Navigation />
      </header>
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
