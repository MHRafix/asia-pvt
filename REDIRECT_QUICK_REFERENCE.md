# Quick Reference: Post-Login Redirects

## TL;DR

After login, users are redirected to:
- **Admin users** → `/admin` (admin dashboard)
- **Regular users** → `/packages` (browse packages)
- **Protected route access** → Back to the original page they were trying to access

## How Callbacks Work

```
User tries to access /bookings without login
         ↓
Redirected to /login?callbackUrl=%2Fbookings
         ↓
User logs in
         ↓
Redirected to /bookings
```

## Protecting Pages

Make any page require login by adding this to the component:

```typescript
'use client';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function Page() {
  const { isAuthenticated, loading } = useProtectedRoute();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;
  // Page content here
}
```

## Admin-Only Pages

Use this for pages only admins can access:

```typescript
'use client';
import { useAdminRoute } from '@/hooks/useProtectedRoute';

export default function AdminPage() {
  const { isAuthenticated, isAdmin, loading } = useAdminRoute();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated || !isAdmin) return null;
  // Admin content here
}
```

## Redirect Destinations

| From | User Type | To |
|------|-----------|-----|
| `/login` | Admin | `/admin` |
| `/login` | Regular | `/packages` |
| `/login?callbackUrl=/booking` | Any | `/booking` |
| `/signup` | Any | `/packages` |
| Protected route | Not logged in | `/login?callbackUrl=<original>` |
| `/admin` | Not admin | Home page |

## Files Modified

- ✓ `components/auth/LoginForm.tsx` - Callback URL support
- ✓ `components/auth/SignupForm.tsx` - Callback URL support
- ✓ `hooks/useAuth.ts` - Callback parameters
- ✓ `hooks/useProtectedRoute.ts` - NEW hook for route protection

## Testing

1. **Clear cache & localStorage** before testing
2. **Try callback URL manually**: `/login?callbackUrl=%2Fpackages%2F123`
3. **Test admin redirect**: Login as admin, should go to `/admin`
4. **Test regular user**: Login as regular user, should go to `/packages`

## Features

✓ Smart redirect to original page  
✓ Role-based default destinations  
✓ URL-encoded callback handling  
✓ Easy page protection  
✓ Seamless user experience
