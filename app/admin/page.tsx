'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Users, MapPin, Package, Calendar, Star } from 'lucide-react';

interface Stats {
  users: number;
  destinations: number;
  packages: number;
  bookings: number;
  reviews: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    destinations: 0,
    packages: 0,
    bookings: 0,
    reviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const [usersRes, destRes, packagesRes, bookingsRes, reviewsRes] = await Promise.all([
          fetch('/api/users', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch('/api/destinations'),
          fetch('/api/packages'),
          fetch('/api/bookings', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch('/api/reviews'),
        ]);

        const usersData = await usersRes.json();
        const destData = await destRes.json();
        const packagesData = await packagesRes.json();
        const bookingsData = await bookingsRes.json();
        const reviewsData = await reviewsRes.json();

        setStats({
          users: usersData.data?.pagination?.total || 0,
          destinations: destData.data?.pagination?.total || 0,
          packages: packagesData.data?.pagination?.total || 0,
          bookings: bookingsData.data?.pagination?.total || 0,
          reviews: reviewsData.data?.pagination?.total || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    { label: 'Total Users', value: stats.users, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Destinations', value: stats.destinations, icon: MapPin, color: 'bg-green-100 text-green-600' },
    { label: 'Packages', value: stats.packages, icon: Package, color: 'bg-purple-100 text-purple-600' },
    { label: 'Bookings', value: stats.bookings, icon: Calendar, color: 'bg-orange-100 text-orange-600' },
    { label: 'Reviews', value: stats.reviews, icon: Star, color: 'bg-yellow-100 text-yellow-600' },
  ];

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-foreground'>Dashboard</h1>
        <p className='text-muted-foreground mt-2'>Welcome to your admin dashboard</p>
      </div>

      {loading ? (
        <div className='flex items-center justify-center h-64'>
          <p className='text-muted-foreground'>Loading statistics...</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className='p-6 hover:shadow-lg transition-shadow'
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-muted-foreground mb-1'>{stat.label}</p>
                    <p className='text-3xl font-bold text-foreground'>{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className='w-6 h-6' />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
        <Card className='p-6'>
          <h2 className='text-xl font-bold text-foreground mb-4'>Quick Stats</h2>
          <div className='space-y-4'>
            <div className='flex justify-between items-center pb-4 border-b border-border'>
              <span className='text-muted-foreground'>Active Users</span>
              <span className='font-semibold text-foreground'>{stats.users}</span>
            </div>
            <div className='flex justify-between items-center pb-4 border-b border-border'>
              <span className='text-muted-foreground'>Total Destinations</span>
              <span className='font-semibold text-foreground'>{stats.destinations}</span>
            </div>
            <div className='flex justify-between items-center pb-4 border-b border-border'>
              <span className='text-muted-foreground'>Active Packages</span>
              <span className='font-semibold text-foreground'>{stats.packages}</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Total Bookings</span>
              <span className='font-semibold text-foreground'>{stats.bookings}</span>
            </div>
          </div>
        </Card>

        <Card className='p-6'>
          <h2 className='text-xl font-bold text-foreground mb-4'>Recent Activity</h2>
          <div className='space-y-4'>
            <p className='text-sm text-muted-foreground py-8 text-center'>
              No recent activity to display
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
