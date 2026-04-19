# Admin Setup Guide

## Overview

This guide walks you through setting up the default admin user and getting started with the Asia Tours Admin Dashboard.

## Prerequisites

- Node.js and npm installed
- MongoDB running and accessible
- `.env` file configured with `MONGODB_URI`
- Development server running (`npm run dev`)

## 3-Step Setup

### Step 1: Create Default Admin User

Run the seed script to create the admin account:

```bash
npm run seed:admin
```

**Expected Output:**
```
[Seed] Connected to MongoDB
[Seed] ✓ Admin user created successfully!

═══════════════════════════════════════════
  DEFAULT ADMIN CREDENTIALS
═══════════════════════════════════════════
  Email:    admin@asiatours.com
  Password: Admin@123
═══════════════════════════════════════════

[Seed] ⚠️  IMPORTANT: Change this password in production!
```

### Step 2: Login to Application

1. Navigate to: **http://localhost:3000/login**
2. Enter credentials:
   - **Email**: admin@asiatours.com
   - **Password**: Admin@123
3. Click "Sign In"
4. You'll be redirected to the home page after successful login

### Step 3: Access Admin Dashboard

1. In the navigation bar, you'll see your name displayed
2. Click the **"Admin"** button in the navbar
3. You'll be taken to: **http://localhost:3000/admin**

---

## Admin Dashboard Overview

The admin dashboard provides 5 main management sections:

### 1. **Users Management** (`/admin/users`)
   - View all registered users
   - Filter users by role
   - Update user information
   - Deactivate/activate users
   - Delete users

### 2. **Destinations Management** (`/admin/destinations`)
   - View all travel destinations
   - Create new destinations
   - Edit destination details
   - Delete destinations
   - Manage destination images and descriptions

### 3. **Travel Packages** (`/admin/packages`)
   - View all travel packages
   - Create new packages
   - Edit package pricing and details
   - Link packages to destinations
   - Delete packages

### 4. **Bookings Management** (`/admin/bookings`)
   - View all customer bookings
   - Track booking status
   - Update booking information
   - Cancel bookings
   - View booking details and customer info

### 5. **Reviews Management** (`/admin/reviews`)
   - View all customer reviews and ratings
   - Approve/reject reviews
   - Delete inappropriate reviews
   - View review details
   - Filter reviews by rating

---

## Optional: Create Test Users

To create regular user accounts for testing:

```bash
npm run seed:users
```

This creates 3 test users:
- **john@example.com** / Test@123
- **jane@example.com** / Test@123
- **mike@example.com** / Test@123

You can use these accounts to test user-facing features like:
- Browsing destinations
- Creating bookings
- Writing reviews
- User profile management

---

## Navbar Features (After Login)

Once logged in as admin, the navbar shows:

1. **Your Name** - Displays the logged-in user's name
2. **Admin Button** - Quick access to admin dashboard
3. **Logout Button** - Securely logout and clear session
4. **Book Now Button** - Still visible to test user flows

---

## API Testing with Admin Credentials

### Get Admin Token

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@asiatours.com",
    "password": "Admin@123"
  }'
```

### Use Token in Protected Requests

```bash
curl -X POST http://localhost:3000/api/destinations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Bali",
    "country": "Indonesia",
    "description": "Beautiful tropical island"
  }'
```

---

## Common Tasks

### Reset Admin User

If you need to reset the admin user:

1. **Delete from MongoDB:**
   ```javascript
   db.users.deleteOne({ email: "admin@asiatours.com" })
   ```

2. **Recreate:**
   ```bash
   npm run seed:admin
   ```

### Create Additional Admin Users

1. Sign up with a new email at `/signup`
2. Update in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "newemail@example.com" },
     { $set: { role: "admin" } }
   )
   ```

### Change Admin Password

1. Login to the admin panel
2. (Feature coming soon: profile management)
3. For now, delete and recreate the user with a new password

---

## Security Reminders

- These default credentials are for **development only**
- Change the password before production deployment
- Use environment variables for sensitive data
- Never commit credentials to version control
- Use HTTPS in production
- Implement rate limiting on login endpoints
- Add additional security measures as needed

---

## Troubleshooting

### Admin Login Fails
- Verify MongoDB is running
- Check `.env` has correct `MONGODB_URI`
- Confirm admin user exists in database
- Check browser console for errors

### Can't Access Admin Dashboard
- Ensure you're logged in
- Verify your account has `role: "admin"`
- Check browser localStorage for `auth_token`
- Clear cache and try again

### Seed Script Errors
- Ensure `MONGODB_URI` is set in `.env`
- Verify MongoDB connection
- Check Node.js version compatibility
- Ensure `bcryptjs` is installed

---

## Next Steps

1. Create destinations and packages in the admin panel
2. Set up test users with `npm run seed:users`
3. Test the complete user journey
4. Customize the system for your needs
5. Deploy to production with updated credentials

For more information, see:
- **API_DOCUMENTATION.md** - Complete API reference
- **DEFAULT_CREDENTIALS.md** - Detailed credentials guide
- **QUICKSTART.md** - Quick start instructions
