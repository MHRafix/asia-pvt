const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

const User = mongoose.model('User', userSchema);

async function verifyAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    
    const adminUsers = await User.find({ role: 'admin' }).select('-password');
    
    console.log('\n=== Admin Users in Database ===');
    if (adminUsers.length === 0) {
      console.log('No admin users found!');
    } else {
      adminUsers.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Active: ${user.isActive}`);
        console.log(`   ID: ${user._id}`);
      });
    }
    
    console.log('\n=== All Users Count ===');
    const totalUsers = await User.countDocuments();
    console.log(`Total users: ${totalUsers}`);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

verifyAdmin();
