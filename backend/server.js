const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-keeper';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Import Routes
const noteRoutes = require('./routes/noteRoutes');

// Use Routes
app.use('/api/notes', noteRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Notes Keeper API is running!',
    endpoints: {
      'GET /api/notes': 'Get all notes',
      'POST /api/notes': 'Create a new note',
      'PUT /api/notes/:id': 'Update a note by ID',
      'DELETE /api/notes/:id': 'Delete a note by ID'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌟 Server is running on port ${PORT}`);
  console.log(`🔗 Access the API at: http://localhost:${PORT}`);
});

module.exports = app;