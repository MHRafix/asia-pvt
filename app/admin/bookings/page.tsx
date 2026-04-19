'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Booking {
  _id: string;
  user: { name: string; email: string } | string;
  travelPackage: { name: string } | string;
  numberOfTravelers: number;
  departureDate: string;
  returnDate: string;
  status: string;
  createdAt: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/bookings?limit=100', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      setDeleteLoading(bookingId);
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Booking deleted successfully');
        setBookings(bookings.filter((b) => b._id !== bookingId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    } finally {
      setDeleteLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-foreground'>Bookings Management</h1>
        <p className='text-muted-foreground mt-2'>Manage all travel bookings</p>
      </div>

      <Card className='p-6'>
        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-muted-foreground'>Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-muted-foreground'>No bookings found</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-border'>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Customer
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Package
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Travelers
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Departure
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className='border-b border-border hover:bg-muted/50'>
                    <td className='px-6 py-4 text-sm font-medium text-foreground'>
                      {typeof booking.user === 'string' ? booking.user : booking.user.name}
                    </td>
                    <td className='px-6 py-4 text-sm text-muted-foreground'>
                      {typeof booking.travelPackage === 'string' ? booking.travelPackage : booking.travelPackage.name}
                    </td>
                    <td className='px-6 py-4 text-sm text-muted-foreground'>
                      {booking.numberOfTravelers}
                    </td>
                    <td className='px-6 py-4 text-sm text-muted-foreground'>
                      {new Date(booking.departureDate).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 text-sm'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm'>
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
                          onClick={() => handleDelete(booking._id)}
                          disabled={deleteLoading === booking._id}
                          className='text-red-500 hover:text-red-700'
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
