# Default Test Credentials

## Quick Start - Default Admin User

To set up default credentials for testing, run the seed script:

```bash
npm run seed:admin
```

This will create a default admin user with the following credentials:

### Admin Account
```
Email:    admin@asiatours.com
Password: Admin@123
Role:     Admin
Status:   Active
```

**Login URL**: http://localhost:3000/login

---

## Test User Accounts

To create test user accounts for development, run:

```bash
npm run seed:users
```

This will create 3 test user accounts:

### Test Users
```
1. John Doe
   Email:    john@example.com
   Password: Test@123
   Role:     User

2. Jane Smith
   Email:    jane@example.com
   Password: Test@123
   Role:     User

3. Mike Johnson
   Email:    mike@example.com
   Password: Test@123
   Role:     User
```

---

## Add Script Commands to package.json

If not already added, add these scripts to your `package.json`:

```json
{
  "scripts": {
    "seed:admin": "node scripts/seed-admin.js",
    "seed:users": "node scripts/seed-test-users.js",
    "seed:all": "npm run seed:admin && npm run seed:users"
  }
}
```

---

## Setup Steps

1. **Ensure MongoDB is running**
   - Check your MONGODB_URI in `.env`
   - Make sure the connection string is correct

2. **Run the admin seed script**
   ```bash
   npm run seed:admin
   ```
   This creates the default admin user.

3. (Optional) **Create test users**
   ```bash
   npm run seed:users
   ```
   This creates 3 test user accounts for testing regular user functionality.

4. **Login to the application**
   - Navigate to http://localhost:3000/login
   - Use the credentials above

5. **(For Admin) Access the dashboard**
   - After logging in with admin credentials, click "Admin" button in navbar
   - Or navigate directly to http://localhost:3000/admin

---

## Testing the System

### As Admin User
- Login with admin@asiatours.com / Admin@123
- Access the Admin Dashboard at `/admin`
- Create, Read, Update, Delete:
  - Users
  - Destinations
  - Travel Packages
  - Bookings
  - Reviews

### As Regular User
- Login with any test user credentials (john@example.com / Test@123)
- Browse destinations and packages
- Create bookings
- Write reviews
- View profile

---

## Important Security Notes

⚠️ **For Development Only**

- These default credentials are for **development and testing only**
- **DO NOT use these in production**
- Change all passwords before deploying to production
- Use strong, unique passwords in production environment
- Implement proper user management and password reset flow
- Use environment variables for sensitive data
- Enable HTTPS for all authentication routes
- Implement rate limiting on login endpoints
- Add CSRF protection
- Use secure session management

---

## Resetting Data

To completely reset and reseed your database:

```bash
# Delete all users and start fresh
# Then run:
npm run seed:all
```

Or manually:
1. Delete the admin user from MongoDB
2. Run `npm run seed:admin` again

---

## Custom Credentials

To create a custom admin user instead:

1. Signup at `/signup` with your preferred email and password
2. Connect to MongoDB directly and update the user record:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

Or modify the `scripts/seed-admin.js` file with your preferred credentials before running it.

---

## Troubleshooting

### Script doesn't run
- Make sure MongoDB URI is set in `.env`
- Ensure Node.js and npm are properly installed
- Run: `npm install` first if dependencies are missing

### "User already exists" error
- The admin user already exists in your database
- To reset: Delete the user from MongoDB and run the script again
- Or use different credentials

### Connection to MongoDB fails
- Verify MongoDB is running
- Check MONGODB_URI in `.env` is correct
- Ensure network access is allowed (for cloud databases)

---

**For more information, see:**
- QUICKSTART.md - Getting started guide
- API_DOCUMENTATION.md - API endpoints
- SETUP.md - Complete setup instructions
