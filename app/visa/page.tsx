import { PageBanner } from '@/components/PageBanner';
import { VisaSection } from '@/components/VisaSection';

export default function VisaPage() {
  return (
    <div className='min-h-screen'>
      <div className='pt-20'>
        <PageBanner
          title='Visa Services'
          subtitle='We help you navigate through the visa process with expert guidance and support'
          gradient='ocean'
        />
        <VisaSection />
      </div>
    </div>
  );
}
