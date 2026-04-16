import { PageBanner } from '@/components/PageBanner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return (
    <div className='min-h-screen'>
      <div className='pt-20'>
        <PageBanner
          title='Blog Article'
          subtitle='Read our latest travel insights and tips'
        />
        <div className='container mx-auto px-4 py-16'>
          <div className='max-w-3xl'>
            <article className='bg-card rounded-lg shadow-card p-8'>
              <h1 className='font-display text-3xl font-bold text-foreground mb-4'>
                Article {params.id}
              </h1>
              <p className='font-body text-muted-foreground mb-6'>
                Blog article content is loading...
              </p>
              <Button variant='outline' asChild>
                <Link href='/blog'>Back to Blog</Link>
              </Button>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
