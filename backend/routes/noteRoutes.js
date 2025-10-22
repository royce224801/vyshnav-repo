const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error - Could not fetch notes'
    });
  }
});

// @desc    Get a single note by ID
// @route   GET /api/notes/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    console.error('Error fetching note:', error);
    
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error - Could not fetch note'
    });
  }
});

// @desc    Create a new note
// @route   POST /api/notes
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both title and description'
      });
    }

    // Create new note
    const note = new Note({
      title: title.trim(),
      description: description.trim()
    });

    const savedNote = await note.save();

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: savedNote
    });
  } catch (error) {
    console.error('Error creating note:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error - Could not create note'
    });
  }
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both title and description'
      });
    }

    // Find and update note
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        description: description.trim(),
        updatedAt: Date.now()
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note
    });
  } catch (error) {
    console.error('Error updating note:', error);
    
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error - Could not update note'
    });
  }
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: note
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error - Could not delete note'
    });
  }
});

module.exports = router;