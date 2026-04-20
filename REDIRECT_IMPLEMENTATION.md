# Post-Login Redirect Implementation Guide

## Overview
The authentication system now intelligently redirects users after successful login based on their role and the page they were trying to access.

## Redirect Flow

### For Regular Users
1. **Direct Login** - User goes to `/login` → Redirects to `/packages` after successful login
2. **Protected Route Access** - User tries to access a protected page (e.g., `/bookings`) without authentication → Redirected to `/login?callbackUrl=/bookings` → After login, redirected back to `/bookings`
3. **Signup** - User creates account → Redirects to `/packages` (or callback URL if provided)

### For Admin Users
1. **Login** - User with admin role logs in → Redirected to `/admin` dashboard
2. **Direct Admin Access** - Non-logged-in user tries to access `/admin` → Redirected to `/login` → After login, redirected back to `/admin`

## Implementation Details

### 1. LoginForm Component (`components/auth/LoginForm.tsx`)
- Captures `callbackUrl` from URL search params: `?callbackUrl=/packages`
- On successful login:
  - Admins → `/admin`
  - Regular users with callback → `{callbackUrl}`
  - Regular users without callback → `/packages`

### 2. SignupForm Component (`components/auth/SignupForm.tsx`)
- Similar callback URL handling as LoginForm
- Default redirect to `/packages` for new users

### 3. useAuth Hook (`hooks/useAuth.ts`)
- `login()` method now accepts optional `callbackUrl` parameter
- `signup()` method now accepts optional `callbackUrl` parameter
- Automatically handles redirects after authentication

### 4. useProtectedRoute Hook (`hooks/useProtectedRoute.ts`)
- **Purpose**: Protect routes that require authentication
- **Usage**: 
  ```typescript
  const { isAuthenticated, loading } = useProtectedRoute();
  ```
- Automatically redirects unauthenticated users to login with callback URL

### 5. useAdminRoute Hook (`hooks/useProtectedRoute.ts`)
- **Purpose**: Protect admin-only routes
- **Usage**:
  ```typescript
  const { isAuthenticated, isAdmin, loading } = useAdminRoute();
  ```
- Redirects non-authenticated users to login
- Redirects non-admin users to home page

## How to Use Callback URLs

### In Components
```typescript
// Manually setting callback URL
const callbackUrl = encodeURIComponent('/packages/luxury-tour');
window.location.href = `/login?callbackUrl=${callbackUrl}`;
```

### In useProtectedRoute Hook
```typescript
'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function BookingPage() {
  const { isAuthenticated, loading } = useProtectedRoute();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null; // Redirected by hook

  return <div>Booking content</div>;
}
```

### In useAdminRoute Hook
```typescript
'use client';

import { useAdminRoute } from '@/hooks/useProtectedRoute';

export default function AdminPage() {
  const { isAuthenticated, isAdmin, loading } = useAdminRoute();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated || !isAdmin) return null; // Redirected by hook

  return <div>Admin content</div>;
}
```

## Example Scenarios

### Scenario 1: User Books a Package Without Login
1. User clicks "Book Now" button on a package page
2. System detects user is not authenticated
3. Redirects to: `/login?callbackUrl=%2Fpackages%2F123`
4. User logs in
5. Automatically redirected to: `/packages/123`

### Scenario 2: Admin Tries to Access Dashboard
1. Admin user logs in at `/login`
2. Successfully authenticated with `role: 'admin'`
3. Automatically redirected to: `/admin`

### Scenario 3: Regular User Logs In
1. User logs in at `/login` (no callback URL)
2. Redirected to: `/packages`
3. User can browse and book packages

## Key Features

✓ **Smart Redirects** - Users return to their intended destination after login
✓ **Role-Based Routing** - Admins get different default redirect than regular users
✓ **Protected Routes** - Easy protection for pages requiring authentication
✓ **Seamless UX** - No need to manually navigate after login
✓ **Callback URL Encoding** - Handles special characters in URLs properly

## Default Destinations

| User Type | No Callback URL | Scenario |
|-----------|-----------------|----------|
| Regular User | `/packages` | Direct login or signup |
| Admin User | `/admin` | Login successful |
| Protected Route | Original URL | Redirected via callback |

## Updating Existing Protected Pages

To protect a page that requires authentication:

```typescript
// app/my-bookings/page.tsx
'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function MyBookingsPage() {
  const { isAuthenticated, loading } = useProtectedRoute();

  if (loading) return <LoadingComponent />;
  if (!isAuthenticated) return null; // Component will redirect

  return <MyBookingsContent />;
}
```

## Testing the Redirect Flow

1. **Test Regular User Flow**:
   - Clear localStorage
   - Visit `/packages`
   - Try to book → Redirected to `/login?callbackUrl=%2Fpackages`
   - Login → Redirected back to `/packages`

2. **Test Admin Flow**:
   - Login with admin credentials
   - Should be redirected to `/admin`

3. **Test Protected Routes**:
   - Logout
   - Try to visit `/admin` → Redirected to `/login?callbackUrl=%2Fadmin`
   - Login with admin credentials → Redirected back to `/admin`

## Technical Details

- **Callback URL Format**: URL-encoded string in query parameters
- **Storage**: Tokens stored in localStorage as `auth_token` and `auth_user`
- **Redirect Delay**: 1000ms delay after login for toast notification visibility
- **Session Management**: Uses JWT tokens with browser storage
