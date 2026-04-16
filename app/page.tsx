import { HeroSection } from '@/components/HeroSection';
import { PackagesSection } from '@/components/PackagesSection';
import { VisaSection } from '@/components/VisaSection';
import { AppointmentSection } from '@/components/AppointmentSection';
import { BlogSection } from '@/components/BlogSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { CTASection } from '@/components/CTASection';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <HeroSection />
      <PackagesSection />
      <VisaSection />
      <AppointmentSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </div>
  );
}
