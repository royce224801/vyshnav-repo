import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

const EditNote = ({ note, onUpdateNote, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize form with note data
  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        description: note.description || ''
      });
    }
  }, [note]);

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

    // Check if anything changed
    if (formData.title.trim() === note.title && formData.description.trim() === note.description) {
      onCancel(); // No changes, just close
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await onUpdateNote(note._id, {
        title: formData.title.trim(),
        description: formData.description.trim()
      });

      if (!result.success) {
        setError(result.error || 'Failed to update note');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content edit-note-modal">
        <div className="modal-header">
          <h3>Edit Note</h3>
          <button
            type="button"
            className="close-btn"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="edit-title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              disabled={isSubmitting}
              maxLength={100}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description" className="form-label">
              Description
            </label>
            <textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              disabled={isSubmitting}
              rows={6}
              maxLength={1000}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
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
                  Updating...
                </>
              ) : (
                <>
                  <FaSave />
                  Save Changes
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
      </div>
    </div>
  );
};

export default EditNote;