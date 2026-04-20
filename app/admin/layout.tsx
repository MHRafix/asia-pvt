'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import toast from 'react-hot-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authorization immediately
    const user = localStorage.getItem('auth_user');
    const token = localStorage.getItem('auth_token');

    if (!user || !token) {
      toast.error('Please login to access admin dashboard');
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(user);
      
      if (userData.role === 'admin') {
        setIsAuthorized(true);
      } else {
        toast.error('Admin access required');
        router.push('/');
        setIsAuthorized(false);
      }
    } catch (error) {
      toast.error('Session expired. Please login again');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
      router.push('/login');
      setIsAuthorized(false);
    }
  }, [router]);

  // While checking authorization, show nothing (router.push will redirect)
  if (isAuthorized === null) {
    return null;
  }

  // If not authorized, show access denied
  if (!isAuthorized) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-red-500 font-semibold'>Access Denied</p>
          <p className='text-muted-foreground text-sm'>You do not have permission to access the admin panel</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen bg-background'>
      <AdminSidebar />
      <div className='flex-1 flex flex-col'>
        <AdminNavbar />
        <main className='flex-1 overflow-auto p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}
