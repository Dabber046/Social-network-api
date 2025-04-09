const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Export the actual connection object, not mongoose
module.exports = mongoose.connection;
// MongoDB connection config