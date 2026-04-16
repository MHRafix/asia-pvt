import { PageBanner } from '@/components/PageBanner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  return (
    <div className='min-h-screen'>
      <div className='pt-20'>
        <PageBanner
          title='Our Services'
          subtitle='Comprehensive travel solutions tailored to your needs'
        />
        <div className='container mx-auto px-4 py-16'>
          <div className='max-w-3xl'>
            <div className='bg-card rounded-lg shadow-card p-8'>
              <h2 className='font-display text-2xl font-bold text-foreground mb-4'>
                {params.slug
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </h2>
              <p className='font-body text-muted-foreground mb-6'>
                Service details are loading...
              </p>
              <Button variant='coral' asChild>
                <Link href='/appointment'>Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
