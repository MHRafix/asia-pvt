import { PageBanner } from '@/components/PageBanner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className='min-h-screen'>
      <div className='pt-20'>
        <PageBanner
          title='Login'
          subtitle='Sign in to your Asia Tours account'
        />
        <div className='container mx-auto px-4 py-16'>
          <div className='max-w-md mx-auto'>
            <div className='bg-card rounded-lg shadow-card p-8'>
              <div className='text-center mb-6'>
                <p className='font-body text-muted-foreground'>
                  Login functionality coming soon. Please contact us for assistance.
                </p>
              </div>
              <Button variant='coral' className='w-full' asChild>
                <Link href='/contact'>Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
