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

const testUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Test@123',
    phone: '+1-555-0101',
    bio: 'Travel enthusiast',
    role: 'user',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'Test@123',
    phone: '+1-555-0102',
    bio: 'Adventure seeker',
    role: 'user',
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'Test@123',
    phone: '+1-555-0103',
    bio: 'Photographer',
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
        console.log(`[Seed] ✓ Created: ${userData.name} (${userData.email})`);
      } else {
        console.log(`[Seed] - Skipped: ${userData.name} (already exists)`);
      }
    }

    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('  TEST USERS');
    console.log('═══════════════════════════════════════════');
    testUsers.forEach(user => {
      console.log(`  Email:    ${user.email}`);
      console.log(`  Password: ${user.password}`);
      console.log('  ---');
    });
    console.log('═══════════════════════════════════════════');
    console.log(`[Seed] Created ${createdCount} new test user(s)`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('[Seed] Error seeding test users:', error.message);
    process.exit(1);
  }
}

seedTestUsers();
