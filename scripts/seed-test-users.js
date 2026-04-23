const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

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

// Test users with admin and normal user
const testUsers = [
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123',
    phone: '+1-555-0100',
    bio: 'System Administrator',
    role: 'admin',
  },
  {
    name: 'Normal User',
    email: 'user@test.com',
    password: 'user123',
    phone: '+1-555-0101',
    bio: 'Regular user account',
    role: 'user',
  },
];

async function seedTestUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[Seed] Connected to MongoDB');

    let createdCount = 0;

    for (const userData of testUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({
          ...userData,
          password: hashedPassword,
          isActive: true,
        });
        await user.save();
        createdCount++;
        console.log(`[Seed] ✓ Created: ${userData.name} (${userData.email}) - Role: ${userData.role}`);
      } else {
        // Update role if needed
        if (existingUser.role !== userData.role) {
          existingUser.role = userData.role;
          await existingUser.save();
          console.log(`[Seed] ↑ Updated role: ${userData.name} -> ${userData.role}`);
        } else {
          console.log(`[Seed] - Skipped: ${userData.name} (already exists)`);
        }
      }
    }

    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('  TEST CREDENTIALS');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    console.log('  ADMIN USER (can access /admin):');
    console.log('  Email:    admin@test.com');
    console.log('  Password: admin123');
    console.log('');
    console.log('  NORMAL USER (cannot access /admin):');
    console.log('  Email:    user@test.com');
    console.log('  Password: user123');
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`[Seed] Created ${createdCount} new test user(s)`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('[Seed] Error seeding test users:', error.message);
    process.exit(1);
  }
}

seedTestUsers();
