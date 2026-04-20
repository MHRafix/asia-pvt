# Asia Tours - Complete Backend & Admin Setup

This is a production-ready travel booking platform with a comprehensive backend API, authentication system, and admin dashboard.

## Features Implemented

### 1. Authentication System
- **Registration API** - `/api/auth/register` - Create new user accounts
- **Login API** - `/api/auth/login` - Authenticate users and issue JWT tokens
- **Password Hashing** - Using bcryptjs for secure password storage
- **JWT Tokens** - Secure token-based authentication
- **Role-Based Access** - Two roles: `user` and `admin`

### 2. Complete API Routes

#### Destinations API
- `GET /api/destinations` - List all destinations with pagination and filters
- `POST /api/destinations` - Create new destination (Admin only)
- `GET /api/destinations/[id]` - Get specific destination details
- `PUT /api/destinations/[id]` - Update destination (Admin only)
- `DELETE /api/destinations/[id]` - Delete destination (Admin only)

#### Travel Packages API
- `GET /api/packages` - List all travel packages
- `POST /api/packages` - Create new package (Admin only)
- `GET /api/packages/[id]` - Get package details
- `PUT /api/packages/[id]` - Update package (Admin only)
- `DELETE /api/packages/[id]` - Delete package (Admin only)

#### Bookings API
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Get booking details
- `PUT /api/bookings/[id]` - Update booking (Admin only)
- `DELETE /api/bookings/[id]` - Cancel booking

#### Reviews API
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/[id]` - Get review details
- `PUT /api/reviews/[id]` - Update review
- `DELETE /api/reviews/[id]` - Delete review (Author or Admin)

#### Users API (Admin)
- `GET /api/users` - List all users (Admin only)
- `POST /api/users` - Create user (Admin only)
- `GET /api/users/[id]` - Get user details (Admin only)
- `PUT /api/users/[id]` - Update user (Admin only)
- `DELETE /api/users/[id]` - Deactivate user (Admin only)

### 3. Frontend Pages & Forms

#### Authentication Pages
- `/login` - Login page with email/password form
- `/signup` - Registration page with validation
- Automatic redirection based on user role (admin → /admin, user → /)

#### Admin Dashboard
- `/admin` - Main admin dashboard with overview
- `/admin/users` - User management (view, update, deactivate)
- `/admin/destinations` - Destination management (CRUD operations)
- `/admin/packages` - Package management (CRUD operations)
- `/admin/bookings` - Booking management and approval
- `/admin/reviews` - Review moderation

#### Main Navbar
- Conditional display based on authentication status
- Show user name when logged in
- Quick access to Admin Dashboard (for admin users)
- Logout functionality with toast notification

### 4. Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Admin role verification on protected endpoints
- Input validation with Zod schemas
- Secure token storage in localStorage
- HTTP-only considerations (can be enhanced)

### 5. User Experience
- React Hot Toast notifications for all actions
- Responsive design (mobile and desktop)
- Smooth loading states
- Form validation with clear error messages
- Automatic redirects based on user role
- Protected admin routes

## Environment Setup

### Required Environment Variables

Add these to your `.env` file:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-agency

# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Set Environment Variables
Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.

### 3. Run Development Server
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Create Admin User

For testing the admin dashboard, you need an admin account:

#### Option A: Direct Database Insert
```javascript
// Using MongoDB Compass or MongoDB shell
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "<bcrypt-hashed-password>",
  phone: "+1234567890",
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

#### Option B: Use API with bcrypt
1. Generate a bcrypt hash for your password
2. POST to `/api/auth/register` with role field set to admin (currently role is always set to 'user', modify the API if needed)

Or manually update the user role:
```bash
# In MongoDB
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## API Authentication

### How to Use JWT Tokens

All protected endpoints (POST, PUT, DELETE) require authorization header:

```javascript
const token = localStorage.getItem('auth_token');

const response = await fetch('/api/destinations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'Paris',
    country: 'France',
    description: 'City of Lights',
    imageUrl: 'https://...',
    attractions: ['Eiffel Tower', 'Louvre'],
    bestTimeToVisit: 'April-June'
  })
});
```

## Project Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── register/
│   │   └── login/
│   ├── destinations/
│   ├── packages/
│   ├── bookings/
│   ├── reviews/
│   └── users/
├── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── users/
│   ├── destinations/
│   ├── packages/
│   ├── bookings/
│   └── reviews/
├── login/
├── signup/
└── layout.tsx

components/
├── auth/
│   ├── LoginForm.tsx
│   └── SignupForm.tsx
├── admin/
│   ├── AdminSidebar.tsx
│   └── AdminNavbar.tsx
└── common/
    └── Navbar.tsx

lib/
├── auth.ts
├── storage.ts
├── models/
├── api/
└── db.ts

hooks/
└── useAuth.ts
```

## Testing the System

### 1. Test Registration
1. Go to `/signup`
2. Fill in the form with name, email, password
3. Submit to create an account

### 2. Test Login
1. Go to `/login`
2. Enter email and password
3. Should redirect to home page

### 3. Test Admin Access
1. Create an admin user (see instructions above)
2. Login with admin account
3. Should see "Admin" button in navbar
4. Click admin button to access dashboard

### 4. Test Protected APIs
Use tools like Postman or curl:

```bash
# Get token first by logging in via /login page

# Create destination (requires admin token)
curl -X POST http://localhost:3000/api/destinations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Tokyo",
    "country": "Japan",
    "description": "Capital of Japan",
    "imageUrl": "https://...",
    "attractions": ["Shibuya", "Senso-ji"],
    "bestTimeToVisit": "March-May"
  }'
```

## Customization

### Add More Admin Features

1. Create new admin page in `/app/admin/feature/page.tsx`
2. Add fetch calls to your API endpoints
3. Add sidebar link in `AdminSidebar.tsx`

### Modify Validation

Update Zod schemas in `lib/api/validators.ts` to enforce different rules.

### Change Token Expiration

Modify `generateToken()` in `lib/auth.ts` to set custom expiration.

## Security Considerations

### For Production:
1. **Use HTTPS** - Always use HTTPS in production
2. **Secure Cookies** - Move JWT to HTTP-only secure cookies
3. **CSRF Protection** - Add CSRF tokens to forms
4. **Rate Limiting** - Add rate limiting to auth endpoints
5. **Input Sanitization** - Sanitize all user inputs
6. **Environment Secrets** - Use proper secret management (not in code)
7. **API Key Protection** - Add API key rotation
8. **Database Indexing** - Index frequently queried fields
9. **Backup Strategy** - Regular database backups

## Troubleshooting

### 401 Unauthorized on Protected Routes
- Make sure you're sending the token in Authorization header
- Token format should be: `Bearer <token>`
- Check if token is expired

### User Can't Access Admin
- Verify user role is set to 'admin' in database
- Check if user is marked as active (isActive: true)

### Passwords Don't Match During Login
- Make sure password hashing is working correctly
- Check bcryptjs is installed

### CORS Issues
- Add origin configuration in API routes if needed

## Deployment

### Deploy to Vercel
```bash
vercel
```

### Set Environment Variables
In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add all required variables from `.env`
3. Redeploy

## Support & Documentation

- MongoDB Docs: https://docs.mongodb.com/
- Next.js Docs: https://nextjs.org/docs
- JWT: https://jwt.io/
- Bcryptjs: https://www.npmjs.com/package/bcryptjs
- Zod Validation: https://zod.dev/

## License

This project is private and proprietary.
