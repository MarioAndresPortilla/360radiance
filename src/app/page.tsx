import { PageShell } from '@/components/layout/PageShell';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { WhySection } from '@/components/sections/WhySection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { BookingSection } from '@/components/sections/BookingSection';
import { HoursSection } from '@/components/sections/HoursSection';

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <TrustBar />
      <WhySection />
      <ServicesSection />
      <AboutSection />
      <JourneySection />
      <TestimonialsSection />
      <ProductsSection />
      <BookingSection />
      <HoursSection />
    </PageShell>
  );
}
