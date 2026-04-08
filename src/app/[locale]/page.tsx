import { setRequestLocale } from 'next-intl/server';
import { PageShell } from '@/components/layout/PageShell';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { WhySection } from '@/components/sections/WhySection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AwardSection } from '@/components/sections/AwardSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { VideoSection } from '@/components/sections/VideoSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { InstagramSection } from '@/components/sections/InstagramSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { BookingSection } from '@/components/sections/BookingSection';
import { HoursSection } from '@/components/sections/HoursSection';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PageShell>
      <Hero />
      <TrustBar />
      <WhySection />
      <ServicesSection />
      <AwardSection />
      <AboutSection />
      <JourneySection />
      <VideoSection />
      <TestimonialsSection />
      <InstagramSection />
      <ProductsSection />
      <BookingSection />
      <HoursSection />
    </PageShell>
  );
}
