import { PageBanner } from '@/components/PageBanner';

export default function ContactPage() {
  return (
    <div className='min-h-screen'>
      <div className='pt-20'>
        <PageBanner
          title='Contact Us'
          subtitle='Get in touch with our team for any questions or inquiries about our services'
        />
        <div className='container mx-auto px-4 py-16'>
          <div className='max-w-2xl mx-auto'>
            <div className='bg-card rounded-lg shadow-card p-8'>
              <h2 className='font-display text-2xl font-bold text-foreground mb-6'>
                Contact Information
              </h2>
              <div className='space-y-4 font-body'>
                <p className='text-foreground'>
                  <strong>Email:</strong> asiatours2018@gmail.com
                </p>
                <p className='text-foreground'>
                  <strong>Phone:</strong> +880 1726631567
                </p>
                <p className='text-foreground'>
                  <strong>Address:</strong> Jamuna Future Park Level #3, Shop #3A-043 KA-244, Kuril
                  Pragati Sharani Bashundhara R/A, Dhaka-1229, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
