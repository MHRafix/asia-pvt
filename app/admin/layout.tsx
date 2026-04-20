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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Run only once on mount
    const checkAdminAccess = () => {
      console.log('[v0] Starting admin auth check');
      
      const user = localStorage.getItem('auth_user');
      const token = localStorage.getItem('auth_token');

      console.log('[v0] Auth check - User:', !!user, 'Token:', !!token);

      if (!user || !token) {
        console.log('[v0] No auth found, redirecting to login');
        setIsLoading(false);
        toast.error('Please login to access admin dashboard');
        router.push('/login');
        return;
      }

      try {
        const userData = JSON.parse(user);
        console.log('[v0] Parsed user:', { email: userData.email, role: userData.role });
        
        if (userData.role !== 'admin') {
          console.log('[v0] User role is not admin:', userData.role);
          setIsLoading(false);
          toast.error('Admin access required');
          router.push('/');
          return;
        }
        
        console.log('[v0] Admin access granted');
        setIsAuthorized(true);
        setIsLoading(false);
      } catch (error) {
        console.log('[v0] Error parsing user:', error);
        setIsLoading(false);
        toast.error('Session expired. Please login again');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        router.push('/login');
      }
    };

    checkAdminAccess();
  }, []);

  // Show loading state while checking
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Verifying admin access...</p>
        </div>
      </div>
    );
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
