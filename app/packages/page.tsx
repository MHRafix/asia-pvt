import { PageBanner } from '@/components/PageBanner';
import { PackagesSection } from '@/components/PackagesSection';

export default function PackagesPage() {
  return (
    <div className='min-h-screen'>
      <div className='pt-20'>
        <PageBanner
          title='Travel Packages'
          subtitle='Explore our curated collection of travel experiences designed to create unforgettable memories'
        />
        <PackagesSection />
      </div>
    </div>
  );
}
