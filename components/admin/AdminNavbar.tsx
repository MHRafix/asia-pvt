'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const AdminNavbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('auth_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <nav className='bg-card border-b border-border px-6 py-4 flex items-center justify-between'>
      <div>
        <p className='text-xs text-muted-foreground'>Welcome back!</p>
        <p className='text-lg font-semibold text-foreground'>{user?.name || 'Admin'}</p>
      </div>

      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2 px-4 py-2 bg-muted rounded-lg'>
          <User className='w-4 h-4 text-muted-foreground' />
          <span className='text-sm text-muted-foreground'>{user?.email}</span>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={handleLogout}
          className='flex items-center gap-2'
        >
          <LogOut className='w-4 h-4' />
          Logout
        </Button>
      </div>
    </nav>
  );
};
