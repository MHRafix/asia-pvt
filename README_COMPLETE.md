# Asia Tours - Complete Travel Booking Platform

A production-ready travel booking platform with world-class architecture, built with Next.js 15, MongoDB, and a secure JWT-based authentication system.

## 🌟 Features

### ✅ Completed & Implemented

- **Secure Authentication System**
  - User registration and login with password hashing (bcryptjs)
  - JWT token-based authentication
  - Role-based access control (User & Admin)
  - Secure session management

- **Complete API Suite**
  - 6 main resource types: Users, Destinations, Packages, Bookings, Reviews
  - Full CRUD operations on all resources
  - Pagination, filtering, and search capabilities
  - Admin-only endpoints with authorization checks
  - Standardized error handling and response format

- **Admin Dashboard**
  - Protected admin routes with role verification
  - User management (view, update, deactivate)
  - Destination management (create, edit, delete)
  - Travel package management
  - Booking management and approval
  - Review moderation system
  - Dashboard with real-time statistics

- **Frontend & UI**
  - Modern, responsive design
  - Login and signup pages with form validation
  - Integrated react-hot-toast notifications
  - Conditional navbar (login/logout, admin access)
  - Admin sidebar with navigation
  - Professional admin dashboard layout

- **Security & Best Practices**
  - Password hashing with bcryptjs
  - JWT token validation on protected routes
  - Input validation with Zod schemas
  - CORS and security headers ready
  - Environment variable configuration
  - Error handling middleware

---

## 📋 System Architecture

### Backend Stack
- **Framework**: Next.js 15 (API Routes)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Validation**: Zod schemas
- **Error Handling**: Centralized error handler

### Frontend Stack
- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Notifications**: react-hot-toast
- **Icons**: Lucide React
- **Form Handling**: React Hook Form

### Project Structure
```
asia-pvt/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   └── login/route.ts
│   │   ├── destinations/
│   │   ├── packages/
│   │   ├── bookings/
│   │   ├── reviews/
│   │   └── users/
│   ├── admin/
│   │   ├── layout.tsx (Protected)
│   │   ├── page.tsx (Dashboard)
│   │   ├── users/page.tsx
│   │   ├── destinations/page.tsx
│   │   ├── packages/page.tsx
│   │   ├── bookings/page.tsx
│   │   └── reviews/page.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── layout.tsx
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   └── AdminNavbar.tsx
│   ├── common/
│   │   └── Navbar.tsx
│   └── ui/
│
├── lib/
│   ├── auth.ts (JWT & password hashing)
│   ├── storage.ts (localStorage utilities)
│   ├── db.ts (MongoDB connection)
│   ├── models/
│   │   ├── User.ts
│   │   ├── Destination.ts
│   │   ├── TravelPackage.ts
│   │   ├── Booking.ts
│   │   └── Review.ts
│   └── api/
│       ├── response.ts (Standardized responses)
│       ├── middleware.ts (Error handling)
│       └── validators.ts (Zod schemas)
│
├── hooks/
│   └── useAuth.ts (Authentication hook)
│
├── providers/
│   └── AuthProvider.tsx (Auth context)
│
├── middleware.ts (Route protection)
├── .env (Configuration)
├── SETUP.md (Setup instructions)
├── API_DOCUMENTATION.md (API docs)
└── README_COMPLETE.md (This file)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- MongoDB Atlas account or local MongoDB

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MHRafix/asia-pvt.git
cd asia-pvt
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Set up environment variables**
```bash
# Copy example and configure
cp .env.example .env

# Edit .env with your values:
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: A secure random string
# - NEXT_PUBLIC_APP_URL: Application URL
```

4. **Run development server**
```bash
npm run dev
# or
pnpm dev
```

5. **Open in browser**
```
http://localhost:3000
```

---

## 🔑 Authentication Flow

### Registration
```
User fills signup form
    ↓
POST /api/auth/register (validation)
    ↓
Password hashed with bcryptjs
    ↓
User saved to MongoDB
    ↓
JWT token generated
    ↓
Token stored in localStorage
    ↓
Redirect to home page
```

### Login
```
User enters credentials
    ↓
POST /api/auth/login (validation)
    ↓
User fetched from database
    ↓
Password compared with hash
    ↓
JWT token generated
    ↓
Token stored in localStorage
    ↓
Redirect based on role (user → home, admin → /admin)
```

### Protected Routes
```
Access /admin
    ↓
Admin Layout checks localStorage for token
    ↓
Parse token and verify role
    ↓
If admin role: Show admin dashboard
    ↓
If not admin: Show error and redirect
    ↓
API requests include token in Authorization header
```

---

## 📡 API Quick Reference

### Authentication
- **POST** `/api/auth/register` - Create new account
- **POST** `/api/auth/login` - Login and get token

### Destinations (Public Read)
- **GET** `/api/destinations` - List all destinations
- **GET** `/api/destinations/:id` - Get destination details
- **POST** `/api/destinations` - Create (Admin only)
- **PUT** `/api/destinations/:id` - Update (Admin only)
- **DELETE** `/api/destinations/:id` - Delete (Admin only)

### Travel Packages (Public Read)
- **GET** `/api/packages` - List all packages
- **GET** `/api/packages/:id` - Get package details
- **POST** `/api/packages` - Create (Admin only)
- **PUT** `/api/packages/:id` - Update (Admin only)
- **DELETE** `/api/packages/:id` - Delete (Admin only)

### Bookings (Authenticated)
- **GET** `/api/bookings` - Get user's bookings
- **POST** `/api/bookings` - Create booking
- **GET** `/api/bookings/:id` - Get booking details
- **PUT** `/api/bookings/:id` - Update (Admin only)
- **DELETE** `/api/bookings/:id` - Cancel booking

### Reviews (Public Read)
- **GET** `/api/reviews` - List reviews
- **POST** `/api/reviews` - Create review (Auth required)
- **PUT** `/api/reviews/:id` - Update own review
- **DELETE** `/api/reviews/:id` - Delete review

### Users (Admin Only)
- **GET** `/api/users` - List all users (Admin only)
- **GET** `/api/users/:id` - Get user details (Admin only)
- **PUT** `/api/users/:id` - Update user (Admin only)
- **DELETE** `/api/users/:id` - Deactivate user (Admin only)

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 👥 User Roles & Permissions

### User Role
- View destinations and packages
- Create and manage own bookings
- Create and manage own reviews
- View own profile
- Cannot access admin features

### Admin Role
- Everything users can do PLUS:
- Manage all users (view, update, deactivate)
- Create/update/delete destinations
- Create/update/delete packages
- Manage all bookings (approve, cancel, update)
- Moderate reviews (delete inappropriate ones)
- View system statistics and analytics

---

## 🛡️ Security Features

### Implemented
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Role-based access control
- ✅ Protected admin routes
- ✅ Input validation with Zod
- ✅ Standardized error handling
- ✅ Secure token storage in localStorage
- ✅ Environment variable configuration

### Production Recommendations
- Use HTTPS for all connections
- Move JWT to HTTP-only secure cookies
- Implement rate limiting on auth endpoints
- Add CSRF protection to forms
- Enable CORS for trusted origins only
- Use secret management service (AWS Secrets Manager, etc.)
- Implement API key rotation
- Add database backup strategy
- Use connection pooling for database

---

## 📊 Database Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String,
  profileImage: String,
  bio: String,
  role: String (enum: ['user', 'admin']),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Destination Schema
```javascript
{
  name: String (required, unique),
  country: String (required),
  description: String,
  imageUrl: String,
  attractions: [String],
  bestTimeToVisit: String,
  createdAt: Date,
  updatedAt: Date
}
```

### TravelPackage Schema
```javascript
{
  destination: ObjectId (ref: Destination),
  title: String (required),
  description: String,
  price: Number (required),
  duration: Number,
  maxParticipants: Number,
  activities: [String],
  inclusions: [String],
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Schema
```javascript
{
  user: ObjectId (ref: User, required),
  package: ObjectId (ref: TravelPackage, required),
  travelers: Number,
  totalPrice: Number,
  startDate: Date,
  status: String (enum: ['pending', 'confirmed', 'completed', 'cancelled']),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Review Schema
```javascript
{
  user: ObjectId (ref: User, required),
  destination: ObjectId (ref: Destination, required),
  rating: Number (1-5, required),
  title: String,
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing the System

### 1. Test User Registration
```bash
# Via UI
1. Go to http://localhost:3000/signup
2. Fill form and submit
3. Should be logged in automatically
```

### 2. Test User Login
```bash
# Via UI
1. Go to http://localhost:3000/login
2. Enter email and password
3. Should redirect to home page
```

### 3. Create Admin User
```bash
# Via MongoDB CLI/Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### 4. Test Admin Dashboard
```bash
1. Login with admin account
2. Click "Admin" button in navbar
3. Access /admin dashboard
4. Manage users, destinations, packages, etc.
```

### 5. Test API Endpoints
```bash
# Get token first by logging in
TOKEN="<your_jwt_token>"

# Create destination
curl -X POST http://localhost:3000/api/destinations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Singapore",
    "country": "Singapore",
    "description": "Lion City",
    "imageUrl": "https://example.com/sg.jpg",
    "attractions": ["Marina Bay Sands"],
    "bestTimeToVisit": "Feb-April"
  }'
```

---

## 🐛 Troubleshooting

### "MongoDB connection failed"
- Check MONGODB_URI in .env
- Ensure MongoDB server is running
- Verify credentials and network access

### "401 Unauthorized on API calls"
- Token might be expired (token expires in 7 days)
- Token not being sent in Authorization header
- Wrong token format (should be "Bearer <token>")

### "Cannot access /admin"
- User is not logged in (go to /login)
- User doesn't have admin role (check database)
- Clear localStorage and login again

### "Form validation errors"
- Check form fields match schema requirements
- Email must be valid format
- Password must be at least 6 characters
- Name must be at least 2 characters

---

## 📈 Performance Optimization

### Implemented
- Connection pooling for MongoDB
- Pagination for list endpoints
- Input validation before database queries
- Indexed database fields

### Recommended
- Add caching layer (Redis)
- Implement CDN for static assets
- Add API response compression
- Use database query optimization
- Monitor with APM tools

---

## 🔄 Deployment

### Deploy to Vercel
```bash
vercel
```

### Set Environment Variables
In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add all variables from .env:
   - MONGODB_URI
   - JWT_SECRET
   - NEXT_PUBLIC_APP_URL

3. Deploy

### Deploy to Other Platforms
The app can be deployed to any Node.js hosting:
- Railway.app
- Heroku
- AWS EC2
- DigitalOcean
- etc.

---

## 📚 Documentation

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference

---

## 🎨 Customization

### Add New Admin Page
1. Create `/app/admin/feature/page.tsx`
2. Add route check in admin layout
3. Add sidebar link in `AdminSidebar.tsx`
4. Create API endpoints as needed

### Change Styling
- Modify Tailwind config in `tailwind.config.ts`
- Update design tokens in `globals.css`
- Customize theme colors and fonts

### Modify Validation Rules
- Edit Zod schemas in `lib/api/validators.ts`
- Update field requirements as needed

---

## 📝 License

This project is proprietary and private.

---

## 🤝 Support

For issues, questions, or improvements:
1. Check the documentation
2. Review API_DOCUMENTATION.md
3. Check SETUP.md for configuration help
4. Review console logs for errors

---

## ✨ What's Next?

### Future Enhancements
- [ ] Email verification on signup
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Analytics dashboard
- [ ] Social login (Google, Facebook)
- [ ] Review images/videos
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Real-time chat support

---

## 🎯 Key Achievements

✅ Complete backend API implementation
✅ Secure authentication system
✅ Role-based access control
✅ Admin dashboard with full CRUD
✅ Professional UI/UX
✅ Error handling and validation
✅ Database models and schemas
✅ Responsive design
✅ React-hot-toast notifications
✅ Comprehensive documentation

---

## 📞 Contact

For support or inquiries, please reach out to the development team.

---

**Built with ❤️ using Next.js 15, MongoDB, and best practices**
