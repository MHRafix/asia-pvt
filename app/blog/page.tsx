import { PageBanner } from '@/components/PageBanner';
import { BlogSection } from '@/components/BlogSection';

export default function BlogPage() {
  return (
    <div className='min-h-screen'>
      <div className='pt-20'>
        <PageBanner
          title='Travel Blog'
          subtitle='Discover inspiring stories, travel tips, and destination guides from our expert travelers'
        />
        <BlogSection />
      </div>
    </div>
  );
}
