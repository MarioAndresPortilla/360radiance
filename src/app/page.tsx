import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingButtons } from '@/components/layout/FloatingButtons';
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
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
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
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
