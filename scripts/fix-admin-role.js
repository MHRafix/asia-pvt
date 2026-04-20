const mongoose = require('mongoose');
require('dotenv').config();

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
  createdAt: Date,
  updatedAt: Date,
});

const User = mongoose.model('User', userSchema);

async function fixAdminRole() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected!');
    
    // Find the admin user
    const adminUser = await User.findOne({ email: 'admin@asiatours.com' });
    
    if (!adminUser) {
      console.log('Admin user not found. Creating one...');
      const result = await User.create({
        name: 'Admin User',
        email: 'admin@asiatours.com',
        password: 'hashed_password_placeholder', // This will be replaced by actual hash
        role: 'admin',
        isActive: true,
      });
      console.log('Admin user created:', result.email);
    } else {
      console.log('Found admin user:', adminUser.email);
      console.log('Current role:', adminUser.role);
      
      // Update role to admin if not already
      if (adminUser.role !== 'admin') {
        adminUser.role = 'admin';
        await adminUser.save();
        console.log('Role updated to admin');
      } else {
        console.log('Role is already set to admin');
      }
    }
    
    // Verify the update
    const updatedUser = await User.findOne({ email: 'admin@asiatours.com' });
    console.log('\nFinal verification:');
    console.log('Email:', updatedUser.email);
    console.log('Role:', updatedUser.role);
    console.log('Active:', updatedUser.isActive);
    
    await mongoose.disconnect();
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

fixAdminRole();
