import { PageBanner } from '@/components/PageBanner';
import { AppointmentSection } from '@/components/AppointmentSection';

export default function AppointmentPage() {
  return (
    <div className='min-h-screen'>
      <div className='pt-20'>
        <PageBanner
          title='Book an Appointment'
          subtitle='Schedule a consultation with our travel experts to plan your perfect trip'
        />
        <AppointmentSection />
      </div>
    </div>
  );
}
