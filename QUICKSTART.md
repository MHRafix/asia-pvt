# Asia Tours - Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites
- Node.js 18+
- MongoDB Atlas account or local MongoDB
- Basic command line knowledge

## Step 1: Setup (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Create .env file with your MongoDB URI
echo "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-agency" > .env
echo "JWT_SECRET=your-super-secret-jwt-key" >> .env
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env
NODE_ENV=development >> .env

# 3. Start dev server
npm run dev
```

Visit: `http://localhost:3000`

## Step 2: Create Your First Account (1 minute)

1. Click **Sign Up** button in top-right
2. Fill in the form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `test123`
3. Click **Create Account**
4. ✅ You're logged in!

## Step 3: Create Admin User (1 minute)

### Option A: Via MongoDB Compass/CLI
```javascript
// In MongoDB
db.users.updateOne(
  { email: "admin@example.com" },
  { 
    $set: { 
      role: "admin",
      name: "Admin User"
    }
  }
)
```

### Option B: Direct DB Insert
```bash
# First, signup a new user at /signup with email: admin@example.com
# Then update the role via MongoDB Compass
```

## Step 4: Test Admin Dashboard (1 minute)

1. Go to `/login`
2. Enter admin email and password
3. You'll see **Admin** button in navbar
4. Click it to access `/admin`

## 🎯 What You Can Do Now

### As Regular User
- ✅ Create account / Login
- ✅ View destinations and packages
- ✅ Create bookings
- ✅ Leave reviews
- ✅ Manage profile

### As Admin
- ✅ Access admin dashboard
- ✅ View statistics
- ✅ Manage users
- ✅ Create/edit destinations
- ✅ Create/edit packages
- ✅ Manage bookings
- ✅ Moderate reviews
- ✅ Logout

## 📱 Live Demo Flow

### 1. User Registration
```
User clicks "Sign Up"
  ↓
Fills form with credentials
  ↓
API validates and hashes password
  ↓
User created in MongoDB
  ↓
JWT token issued
  ↓
Logged in automatically
  ↓
Redirected to home
```

### 2. Admin Operations
```
Login as admin
  ↓
See "Admin" button in navbar
  ↓
Click Admin button
  ↓
Enter admin dashboard
  ↓
View dashboard statistics
  ↓
Manage destinations, packages, users, etc.
```

## 🧪 Quick API Test

```bash
# Get your token by logging in via the UI
# Then use this in terminal:

TOKEN="<your_token_from_login>"

# Create a destination (Admin only)
curl -X POST http://localhost:3000/api/destinations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Bali",
    "country": "Indonesia",
    "description": "Tropical Paradise",
    "imageUrl": "https://example.com/bali.jpg",
    "attractions": ["Ubud Temple", "Beaches"],
    "bestTimeToVisit": "April-October"
  }'

# Get all destinations
curl http://localhost:3000/api/destinations
```

## 🔐 Default Test Accounts

After setup, create these accounts:

### Admin Account
- Email: `admin@example.com`
- Password: `admin123`
- (Don't forget to update role to 'admin' in MongoDB)

### User Account  
- Email: `user@example.com`
- Password: `user123`

## 📊 Files & Folders to Know

```
Important Files:
├── .env                          # Your configuration
├── app/api/                      # Backend APIs
├── app/admin/                    # Admin pages
├── app/login/ & app/signup/      # Auth pages
├── components/auth/              # Login/signup forms
├── lib/auth.ts                   # Authentication logic
└── SETUP.md                      # Full setup guide

Admin Dashboard Pages:
├── /admin                        # Dashboard home
├── /admin/users                  # User management
├── /admin/destinations           # Destination CRUD
├── /admin/packages              # Package CRUD
├── /admin/bookings              # Booking management
└── /admin/reviews               # Review moderation
```

## ⚡ Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linter
npm run lint

# Format code
npm run format

# Install new package
npm install package-name
```

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check MONGODB_URI in .env
# Make sure MongoDB is running
# Verify credentials
```

### "Port 3000 already in use"
```bash
# Find process using port
lsof -i :3000

# Kill it
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### "Login not working"
```bash
# Clear browser cache
# Check .env JWT_SECRET is set
# Make sure user exists in MongoDB
```

### "Can't access admin"
```bash
# Make sure user role is 'admin' in database
# Clear localStorage and login again
# Check browser console for errors
```

## 📚 Documentation

For detailed information, see:
- **SETUP.md** - Complete setup guide
- **API_DOCUMENTATION.md** - API reference
- **README_COMPLETE.md** - Full documentation

## 🎓 Learning Path

1. **Understand the flow**: Read the "Quick API Test" section above
2. **Explore the code**: Check `/app/api/auth/` to see login logic
3. **Try the UI**: Create account, login, explore dashboard
4. **Test APIs**: Use curl or Postman to test endpoints
5. **Customize**: Add features based on your needs

## 🚀 Next Steps

After quickstart, you can:

1. **Create test data**
   - Add destinations in admin dashboard
   - Create travel packages
   - Make bookings

2. **Customize the app**
   - Change colors in `globals.css`
   - Modify layouts
   - Add new admin pages

3. **Deploy to production**
   - Push to GitHub
   - Deploy to Vercel
   - Set environment variables

4. **Add features**
   - Payment integration
   - Email notifications
   - Advanced search
   - Analytics

## 💡 Tips & Tricks

- **Use browser DevTools**: F12 to see network requests
- **Check MongoDB**: View your data in MongoDB Compass
- **Toast notifications**: All actions show feedback
- **Form validation**: Real-time error messages
- **Mobile friendly**: Works on phones and tablets

## 📞 Getting Help

If stuck:
1. Check the error message
2. Look at browser console (F12)
3. Review SETUP.md for full details
4. Check API_DOCUMENTATION.md

---

**Happy coding! 🎉**

Your complete travel booking platform is ready to go!
