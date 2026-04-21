'use client';

import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { useAdminRoute } from '@/hooks/useProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading } = useAdminRoute();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Loading...</p>
        </div>
      </div>
    );
  }

  // If not admin, show access denied (but useAdminRoute will redirect anyway)
  if (!isAdmin) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-red-500 font-semibold'>Access Denied</p>
          <p className='text-muted-foreground text-sm'>Admin access required</p>
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
