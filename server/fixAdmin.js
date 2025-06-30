import mongoose from 'mongoose';
import User from './models/User.js';

mongoose.connect('mongodb://localhost:27017/megablog')
  .then(async () => {
    try {
      console.log('🔍 Checking admin user...');
      
      // Check if admin exists
      let adminUser = await User.findOne({ email: 'admin@megablog.com' });
      
      if (adminUser) {
        console.log('📝 Admin user found, updating password...');
        // Update password (let the pre-save hook hash it)
        adminUser.password = 'admin123';
        await adminUser.save();
        console.log('✅ Admin password updated successfully!');
      } else {
        console.log('📝 Creating new admin user...');
        // Create new admin user (let the pre-save hook hash the password)
        adminUser = await User.create({
          name: 'Admin User',
          email: 'admin@megablog.com',
          password: 'admin123',
          role: 'admin'
        });
        console.log('✅ Admin user created successfully!');
      }
      
      console.log('\n👤 Admin credentials:');
      console.log('   Email: admin@megablog.com');
      console.log('   Password: admin123');
      console.log('   Role: admin');
      
      // Test the password
      const isPasswordValid = await adminUser.comparePassword('admin123');
      console.log(`🔐 Password test: ${isPasswordValid ? '✅ Valid' : '❌ Invalid'}`);
      
      process.exit(0);
    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }); 