'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MapPin,
  Package,
  Calendar,
  Star,
  Users,
  Menu,
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    label: 'Destinations',
    href: '/admin/destinations',
    icon: MapPin,
  },
  {
    label: 'Packages',
    href: '/admin/packages',
    icon: Package,
  },
  {
    label: 'Bookings',
    href: '/admin/bookings',
    icon: Calendar,
  },
  {
    label: 'Reviews',
    href: '/admin/reviews',
    icon: Star,
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-card border border-border'
      >
        <Menu className='w-5 h-5' />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative left-0 top-0 h-screen w-64 bg-card border-r border-border transition-all duration-300 z-30 ${
          !isOpen && '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className='p-6 border-b border-border'>
          <h1 className='text-2xl font-bold text-foreground'>TravelHub Admin</h1>
          <p className='text-xs text-muted-foreground mt-1'>Management Panel</p>
        </div>

        <nav className='p-4 space-y-2'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className='w-5 h-5' />
                <span className='font-medium'>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 md:hidden z-20'
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
