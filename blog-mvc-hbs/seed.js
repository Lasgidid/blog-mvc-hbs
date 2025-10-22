

require('dotenv').config({ path: './blog.env' });
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Blog = require('./src/models/Blog');

const mongoURL = process.env.MONGODB_URL;

(async () => {
  try {
    await connectDB(mongoURL);
    console.log('✅ MongoDB connected.');

    // Create Admin User
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      await User.create({ username, password });
      console.log(`👤 Admin user "${username}" created.`);
    } else {
      console.log(' Admin user already exists.');
    }
    // Add Sample Blog Posts if none exist
    const postCount = await Blog.countDocuments();
    if (postCount === 0) {
      await Blog.insertMany([
        { title: 'Welcome to the Blog', author: username, body: 'This is your first post!' },
        { title: 'Another Post', author: username, body: 'You can add more posts later.' }
      ]);
      console.log('📝 Sample blog posts created.');
    } else {
      console.log('ℹ️ Blog posts already exist.');
    }

    await mongoose.connection.close();
    console.log('✅ Seeding complete. Connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
})();