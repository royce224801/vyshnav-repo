import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
  
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <h3>No notes yet</h3>
        <p>Start by creating your first note above!</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={() => onEditNote(note)}
          onDelete={() => onDeleteNote(note._id)}
        />
      ))}
    </div>
  );
};

export default NoteList;