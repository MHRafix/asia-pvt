import { PageBanner } from '@/components/PageBanner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface VisaDetailPageProps {
  params: {
    slug: string;
  };
}

export default function VisaDetailPage({ params }: VisaDetailPageProps) {
  return (
    <div className='min-h-screen'>
      <div className='pt-20'>
        <PageBanner
          title='Visa Information'
          subtitle='Detailed visa requirements and application process'
          gradient='ocean'
        />
        <div className='container mx-auto px-4 py-16'>
          <div className='max-w-3xl'>
            <div className='bg-card rounded-lg shadow-card p-8'>
              <h2 className='font-display text-2xl font-bold text-foreground mb-4'>
                {params.slug.toUpperCase()} Visa
              </h2>
              <p className='font-body text-muted-foreground mb-6'>
                Detailed visa information for {params.slug} is loading...
              </p>
              <Button variant='coral' asChild>
                <Link href='/contact'>Get Help with Visa</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
