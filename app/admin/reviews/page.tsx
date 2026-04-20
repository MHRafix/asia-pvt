'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, Trash2, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Review {
  _id: string;
  user: { name: string } | string;
  destination?: { name: string } | string;
  travelPackage?: { name: string } | string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews?limit=100');
      const data = await response.json();
      if (data.success) {
        setReviews(data.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      setDeleteLoading(reviewId);
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Review deleted successfully');
        setReviews(reviews.filter((r) => r._id !== reviewId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    } finally {
      setDeleteLoading(null);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className='flex items-center gap-1'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-foreground'>Reviews Management</h1>
        <p className='text-muted-foreground mt-2'>Manage user reviews</p>
      </div>

      <Card className='p-6'>
        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-muted-foreground'>Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-muted-foreground'>No reviews found</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {reviews.map((review) => (
              <div key={review._id} className='border border-border rounded-lg p-4 hover:bg-muted/50 transition'>
                <div className='flex justify-between items-start mb-3'>
                  <div>
                    <h3 className='font-semibold text-foreground'>{review.title}</h3>
                    <p className='text-sm text-muted-foreground'>
                      By {typeof review.user === 'string' ? review.user : review.user.name}
                    </p>
                  </div>
                  <div className='text-right'>
                    {renderStars(review.rating)}
                    <p className='text-xs text-muted-foreground mt-1'>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className='text-sm text-muted-foreground mb-3'>{review.content}</p>

                <div className='flex justify-between items-center pt-3 border-t border-border'>
                  <p className='text-xs text-muted-foreground'>
                    {review.destination && (
                      <>
                        Destination: {typeof review.destination === 'string' ? review.destination : review.destination.name}
                      </>
                    )}
                    {review.travelPackage && (
                      <>
                        Package: {typeof review.travelPackage === 'string' ? review.travelPackage : review.travelPackage.name}
                      </>
                    )}
                  </p>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-muted-foreground hover:text-foreground'
                    >
                      <Eye className='w-4 h-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDelete(review._id)}
                      disabled={deleteLoading === review._id}
                      className='text-red-500 hover:text-red-700'
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
