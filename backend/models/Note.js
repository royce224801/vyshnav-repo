const mongoose = require('mongoose');

// Define the Note schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Note title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Note description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
noteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Update the updatedAt field before updating
noteSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Create and export the Note model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;