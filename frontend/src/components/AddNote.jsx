import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const AddNote = ({ onAddNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please fill in both title and description');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await onAddNote({
        title: formData.title.trim(),
        description: formData.description.trim()
      });

      if (result.success) {
        // Reset form on success
        setFormData({ title: '', description: '' });
        setIsExpanded(false);
      } else {
        setError(result.error || 'Failed to add note');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({ title: '', description: '' });
    setIsExpanded(false);
    setError(null);
  };

  // Handle click on collapsed form
  const handleExpand = () => {
    setIsExpanded(true);
  };

  return (
    <div className="add-note-container">
      {!isExpanded ? (
        // Collapsed state
        <div className="add-note-collapsed" onClick={handleExpand}>
          <FaPlus className="add-icon" />
          <span>Take a note...</span>
        </div>
      ) : (
        // Expanded state
        <form className="add-note-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Create New Note</h3>
            <button
              type="button"
              className="close-btn"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <FaTimes />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Note title..."
              className="form-input title-input"
              disabled={isSubmitting}
              maxLength={100}
              autoFocus
            />
          </div>

          <div className="form-group">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write your note here..."
              className="form-input description-input"
              disabled={isSubmitting}
              rows={4}
              maxLength={1000}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Adding...
                </>
              ) : (
                <>
                  <FaPlus />
                  Add Note
                </>
              )}
            </button>
          </div>

          {/* Character count */}
          <div className="character-count">
            <small>
              Title: {formData.title.length}/100 | 
              Description: {formData.description.length}/1000
            </small>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddNote;