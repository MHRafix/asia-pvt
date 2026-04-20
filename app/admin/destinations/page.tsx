'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2, Edit, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Destination {
  _id: string;
  name: string;
  country: string;
  description: string;
  createdAt: string;
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/destinations?limit=100');
      const data = await response.json();
      if (data.success) {
        setDestinations(data.data.destinations);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
      toast.error('Failed to fetch destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (destId: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;

    try {
      setDeleteLoading(destId);
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(`/api/destinations/${destId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Destination deleted successfully');
        setDestinations(destinations.filter((d) => d._id !== destId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting destination:', error);
      toast.error('Failed to delete destination');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div>
      <div className='mb-8 flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Destinations Management</h1>
          <p className='text-muted-foreground mt-2'>Manage all travel destinations</p>
        </div>
        <Button variant='coral' className='flex items-center gap-2'>
          <Plus className='w-4 h-4' />
          Add Destination
        </Button>
      </div>

      <Card className='p-6'>
        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-muted-foreground'>Loading destinations...</p>
          </div>
        ) : destinations.length === 0 ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-muted-foreground'>No destinations found</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-border'>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Name
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Country
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Description
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Created
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((dest) => (
                  <tr key={dest._id} className='border-b border-border hover:bg-muted/50'>
                    <td className='px-6 py-4 text-sm font-medium text-foreground'>{dest.name}</td>
                    <td className='px-6 py-4 text-sm text-muted-foreground'>{dest.country}</td>
                    <td className='px-6 py-4 text-sm text-muted-foreground'>
                      {dest.description?.substring(0, 50)}...
                    </td>
                    <td className='px-6 py-4 text-sm text-muted-foreground'>
                      {new Date(dest.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-muted-foreground hover:text-foreground'
                        >
                          <Edit className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleDelete(dest._id)}
                          disabled={deleteLoading === dest._id}
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
