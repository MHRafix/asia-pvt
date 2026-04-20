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
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = () => {
      const user = localStorage.getItem('auth_user');
      const token = localStorage.getItem('auth_token');

      console.log('[v0] Admin Layout - Checking auth:', { hasUser: !!user, hasToken: !!token });

      if (!user || !token) {
        console.log('[v0] No user or token found');
        toast.error('Please login to access admin dashboard');
        setLoading(false);
        router.push('/login');
        return;
      }

      try {
        const userData = JSON.parse(user);
        console.log('[v0] Parsed user data:', { name: userData.name, role: userData.role });
        
        if (userData.role !== 'admin') {
          console.log('[v0] User role is not admin:', userData.role);
          toast.error('You are not authorized to access this page');
          setLoading(false);
          router.push('/');
          return;
        }
        
        console.log('[v0] User authorized as admin');
        setIsAuthorized(true);
        setLoading(false);
      } catch (error) {
        console.log('[v0] Error parsing user data:', error);
        toast.error('Invalid session. Please login again');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        setLoading(false);
        router.push('/login');
      }
    };

    // Add a small delay to ensure localStorage is ready
    const timeoutId = setTimeout(checkAuthorization, 100);
    
    return () => clearTimeout(timeoutId);
  }, [router]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Verifying admin access...</p>
        </div>
      </div>
    );
  }

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
