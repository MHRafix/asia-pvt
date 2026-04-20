'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './useAuth';

export const useProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      // Redirect to login with callback URL
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
    }
  }, [isAuthenticated, loading, pathname, router]);

  return { isAuthenticated, loading };
};

export const useAdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      // Redirect to login with callback URL
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }

    if (!isAdmin) {
      // Redirect non-admin users to home
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, loading, pathname, router]);

  return { isAuthenticated, isAdmin, loading };
};
