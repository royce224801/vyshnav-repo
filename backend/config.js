// Configuration file for Notes Keeper Backend
// Replace the MongoDB URI with your actual connection string

const config = {
  // MongoDB Connection String
  // For MongoDB Atlas, use your actual connection string
  MONGODB_URI: 'mongodb+srv://vyshnavdev224815:ambadi123@collabtaskcluster.w6n0zyr.mongodb.net/?retryWrites=true&w=majority&appName=CollabTaskCluster',
  
  // Server Port
  PORT: process.env.PORT || 5000,
  
  // Node Environment
  NODE_ENV: process.env.NODE_ENV || 'development'
};

module.exports = config;