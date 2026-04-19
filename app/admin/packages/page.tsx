'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2, Edit, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TravelPackage {
  _id: string;
  name: string;
  destination: { name: string } | string;
  price: number;
  duration: number;
  createdAt: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/packages?limit=100');
      const data = await response.json();
      if (data.success) {
        setPackages(data.data.packages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pkgId: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      setDeleteLoading(pkgId);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/packages/${pkgId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Package deleted successfully');
        setPackages(packages.filter((p) => p._id !== pkgId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      toast.error('Failed to delete package');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div>
      <div className='mb-8 flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Packages Management</h1>
          <p className='text-muted-foreground mt-2'>Manage all travel packages</p>
        </div>
        <Button variant='coral' className='flex items-center gap-2'>
          <Plus className='w-4 h-4' />
          Add Package
        </Button>
      </div>

      <Card className='p-6'>
        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-muted-foreground'>Loading packages...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-muted-foreground'>No packages found</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-border'>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Package Name
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Destination
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Price
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Duration (Days)
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
                {packages.map((pkg) => (
                  <tr key={pkg._id} className='border-b border-border hover:bg-muted/50'>
                    <td className='px-6 py-4 text-sm font-medium text-foreground'>{pkg.name}</td>
                    <td className='px-6 py-4 text-sm text-muted-foreground'>
                      {typeof pkg.destination === 'string' ? pkg.destination : pkg.destination.name}
                    </td>
                    <td className='px-6 py-4 text-sm font-medium text-foreground'>
                      ${pkg.price.toLocaleString()}
                    </td>
                    <td className='px-6 py-4 text-sm text-muted-foreground'>{pkg.duration}</td>
                    <td className='px-6 py-4 text-sm text-muted-foreground'>
                      {new Date(pkg.createdAt).toLocaleDateString()}
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
                          onClick={() => handleDelete(pkg._id)}
                          disabled={deleteLoading === pkg._id}
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
