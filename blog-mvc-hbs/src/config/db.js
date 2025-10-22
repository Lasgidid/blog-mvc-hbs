const mongoose = require('mongoose');

async function connectDB(url) {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Database connected successfully.');
  } catch (err) {
    console.error('❌ Failed to connect to DB:', err);
    process.exit(1);
  }
}

module.exports = connectDB;