import mongoose from 'mongoose';
import User from './models/User.js';
import Post from './models/Post.js';
import bcrypt from 'bcryptjs';

// This script helps migrate your local data to production
// Run this after setting up your production database

const migrateToProduction = async () => {
  try {
    console.log('🚀 Starting migration to production...');
    
    // Connect to your production database
    // Replace with your actual MongoDB Atlas connection string
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/megablog');
    console.log('✅ Connected to database');

    // Create admin user if it doesn't exist
    let adminUser = await User.findOne({ email: 'admin@megablog.com' });
    
    if (!adminUser) {
      console.log('📝 Creating admin user...');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@megablog.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Check existing posts
    const postCount = await Post.countDocuments();
    console.log(`📊 Found ${postCount} existing posts`);

    if (postCount === 0) {
      console.log('⚠️  No posts found. You may need to create posts manually or restore from backup.');
    } else {
      console.log('✅ Posts are ready for production');
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Deploy your backend to Render/Heroku');
    console.log('2. Deploy your frontend to Vercel/Netlify');
    console.log('3. Test admin login: admin@megablog.com / admin123');
    console.log('4. Verify all posts are visible');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration
migrateToProduction(); 