const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  profileImage: String,
  bio: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[Seed] Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@asiatours.com' });
    
    if (existingAdmin) {
      console.log('[Seed] Admin user already exists!');
      console.log('[Seed] Email: admin@asiatours.com');
      console.log('[Seed] Password: Admin@123');
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@asiatours.com',
      password: hashedPassword,
      phone: '+1-555-0100',
      bio: 'System Administrator',
      role: 'admin',
      isActive: true,
    });

    await admin.save();
    console.log('[Seed] ✓ Admin user created successfully!');
    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('  DEFAULT ADMIN CREDENTIALS');
    console.log('═══════════════════════════════════════════');
    console.log('  Email:    admin@asiatours.com');
    console.log('  Password: Admin@123');
    console.log('═══════════════════════════════════════════');
    console.log('');
    console.log('[Seed] ⚠️  IMPORTANT: Change this password in production!');
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('[Seed] Error seeding admin:', error.message);
    process.exit(1);
  }
}

seedAdmin();
