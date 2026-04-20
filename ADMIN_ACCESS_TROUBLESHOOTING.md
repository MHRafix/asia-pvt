# Admin Access Troubleshooting Guide

## Problem: Admin is logged in but cannot access /admin route

This guide will help you diagnose and fix admin access issues.

---

## Quick Fix (Step-by-Step)

### Step 1: Verify Admin Role in Database
Run this command to check if your admin user has the correct role:
```bash
npm run verify:admin
```

Expected output should show:
```
Admin Users in Database
1. Admin User
   Email: admin@asiatours.com
   Role: admin
   Active: true
```

### Step 2: Fix Admin Role (if needed)
If the role is not 'admin' in the database, run:
```bash
npm run fix:admin-role
```

This will:
- Find the admin user
- Update the role to 'admin'
- Verify the changes

### Step 3: Clear Browser Storage and Re-login
1. Open DevTools (F12 in Chrome/Firefox)
2. Go to Application > Local Storage
3. Remove keys:
   - `auth_token`
   - `auth_user`
4. Reload the page
5. Login again at http://localhost:3000/login

---

## What I Fixed

### 1. Admin Layout (app/admin/layout.tsx)
- Added detailed console logging to debug the authorization check
- Added a small delay (100ms) to ensure localStorage is ready
- Improved error messages for debugging
- Fixed the loading/error states

### 2. Authorization Logic
The layout now:
1. Checks for auth token and user in localStorage
2. Parses the user object
3. Verifies the role is 'admin'
4. Shows helpful error messages if something fails

### 3. New Diagnostic Scripts
Created two new scripts to help debug:
- `npm run verify:admin` - Check admin users in database
- `npm run fix:admin-role` - Update admin role in database

---

## Possible Causes & Solutions

### Issue 1: Admin user created without role
**Symptom:** User exists but role is 'user' instead of 'admin'

**Solution:**
```bash
npm run fix:admin-role
```

### Issue 2: Role not persisting in localStorage
**Symptom:** Logs in successfully but role is missing from localStorage

**Fix:** Clear localStorage and re-login
1. F12 > Application > Local Storage > Delete all auth keys
2. Refresh page
3. Login again

### Issue 3: Incorrect admin email
**Check:** The admin email in the database should be exactly: `admin@asiatours.com`

**View admin users:**
```bash
npm run verify:admin
```

---

## How the Authorization Check Works

When you visit http://localhost:3000/admin:

```
1. Admin Layout mounts
   ↓
2. useEffect checks localStorage for:
   - auth_token (JWT token)
   - auth_user (user object with role)
   ↓
3. If both exist:
   - Parse auth_user
   - Check if role === 'admin'
   ↓
4a. If role is 'admin':
    - Set isAuthorized = true
    - Show admin dashboard
    ↓
4b. If role is NOT 'admin':
    - Show "Access Denied" message
    - Redirect to home page
    ↓
4c. If no token/user:
    - Redirect to login with toast notification
```

---

## Browser Console Debugging

When you access /admin, check the browser console (F12) for debug messages:

```javascript
[v0] Admin Layout - Checking auth: { hasUser: true, hasToken: true }
[v0] Parsed user data: { name: 'Admin User', role: 'admin' }
[v0] User authorized as admin
```

If you see errors like:
- `No user or token found` - Login is required
- `User role is not admin: user` - User doesn't have admin role
- `Error parsing user data` - localStorage data is corrupted

---

## Complete Checklist

- [ ] Run `npm run verify:admin` to check database
- [ ] Run `npm run fix:admin-role` if role is wrong
- [ ] Clear browser localStorage
- [ ] Close and re-open browser
- [ ] Login again with admin@asiatours.com
- [ ] Check browser console for debug messages
- [ ] Visit http://localhost:3000/admin
- [ ] Should see admin dashboard

---

## Still Having Issues?

If the problem persists:

1. **Check MongoDB connection:**
   - Ensure MONGODB_URI is set correctly in .env
   - Verify MongoDB is running

2. **Check user object in localStorage:**
   - Open DevTools > Application > Local Storage
   - Find `auth_user` key
   - It should contain JSON with `role: "admin"`

3. **Check API response:**
   - Open DevTools > Network tab
   - Login
   - Click the login API call
   - Check Response tab
   - Should include `role: "admin"` in user object

4. **Run verification script:**
   ```bash
   npm run verify:admin
   ```

---

## Reference

- Admin Layout: `app/admin/layout.tsx`
- Login API: `app/api/auth/login/route.ts`
- Verification Script: `scripts/verify-admin.js`
- Fix Script: `scripts/fix-admin-role.js`
