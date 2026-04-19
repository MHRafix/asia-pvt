'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2, Edit, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const url = `/api/users${searchTerm ? `?search=${searchTerm}` : ''}`;
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setUsers(data.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      setDeleteLoading(userId);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        toast.success('User deleted successfully');
        setUsers(users.filter((u) => u._id !== userId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-foreground'>Users Management</h1>
        <p className='text-muted-foreground mt-2'>Manage all user accounts</p>
      </div>

      <Card className='p-6'>
        <div className='mb-6'>
          <input
            type='text'
            placeholder='Search users by name or email...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>

        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-muted-foreground'>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-muted-foreground'>No users found</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-border'>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Name
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Email
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Phone
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Role
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-foreground'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className='border-b border-border hover:bg-muted/50'>
                    <td className='px-6 py-4 text-sm text-foreground'>{user.name}</td>
                    <td className='px-6 py-4 text-sm text-muted-foreground'>{user.email}</td>
                    <td className='px-6 py-4 text-sm text-muted-foreground'>{user.phone || '-'}</td>
                    <td className='px-6 py-4 text-sm'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-muted-foreground hover:text-foreground'
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
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
                          onClick={() => handleDelete(user._id)}
                          disabled={deleteLoading === user._id}
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
