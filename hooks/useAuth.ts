'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storageUtils } from '@/lib/storage';
import toast from 'react-hot-toast';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  profileImage?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from storage
  useEffect(() => {
    const storedToken = storageUtils.getToken();
    const storedUser = storageUtils.getUser();
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string, callbackUrl?: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const { token, user } = data.data;
      
      setToken(token);
      setUser(user);
      storageUtils.setToken(token);
      storageUtils.setUser(user);
      
      toast.success('Login successful!');
      
      // Redirect based on role and callback URL
      if (user.role === 'admin') {
        router.push('/admin');
      } else if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push('/packages');
      }

      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [router]);

  const signup = useCallback(async (name: string, email: string, password: string, phone?: string, callbackUrl?: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const { token, user } = data.data;
      
      setToken(token);
      setUser(user);
      storageUtils.setToken(token);
      storageUtils.setUser(user);
      
      toast.success('Account created successfully!');
      
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push('/packages');
      }

      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    storageUtils.clearAuth();
    toast.success('Logged out successfully');
    router.push('/');
  }, [router]);

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'admin';

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    signup,
    logout,
  };
};
