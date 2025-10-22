import React, { useState } from 'react';
import { FaEdit, FaTrash, FaClock } from 'react-icons/fa';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Handle delete with confirmation
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Truncate text if too long
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="note-card">
      <div className="note-content">
        <h3 className="note-title" title={note.title}>
          {note.title}
        </h3>
        <p className="note-description" title={note.description}>
          {truncateText(note.description)}
        </p>
      </div>

      <div className="note-footer">
        <div className="note-date">
          <FaClock className="clock-icon" />
          <span>{formatDate(note.updatedAt || note.createdAt)}</span>
        </div>

        <div className="note-actions">
          <button
            className="action-btn edit-btn"
            onClick={onEdit}
            title="Edit note"
            disabled={isDeleting}
          >
            <FaEdit />
          </button>
          <button
            className={`action-btn delete-btn ${isDeleting ? 'deleting' : ''}`}
            onClick={handleDelete}
            title="Delete note"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="spinner-small"></span>
            ) : (
              <FaTrash />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;