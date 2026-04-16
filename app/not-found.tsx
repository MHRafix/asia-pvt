import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex min-h-[calc(100vh-160px)] items-center justify-center bg-muted'>
      <div className='text-center max-w-md'>
        <h1 className='font-display mb-4 text-6xl font-bold text-foreground'>404</h1>
        <p className='font-body mb-4 text-xl text-muted-foreground'>
          Oops! Page not found
        </p>
        <p className='font-body mb-8 text-muted-foreground'>
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button variant='coral' asChild>
          <Link href='/'>Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
