import React, { useState, useEffect } from 'react';
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';
import EditNote from './components/EditNote';
import { notesAPI } from './services/api';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Fetch notes from API
  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await notesAPI.getAllNotes();
      setNotes(response.data.data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to fetch notes. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Add a new note
  const handleAddNote = async (noteData) => {
    try {
      const response = await notesAPI.createNote(noteData);
      setNotes(prevNotes => [response.data.data, ...prevNotes]);
      return { success: true };
    } catch (error) {
      console.error('Error adding note:', error);
      const errorMessage = error.response?.data?.error || 'Failed to add note';
      return { success: false, error: errorMessage };
    }
  };

  // Update a note
  const handleUpdateNote = async (id, noteData) => {
    try {
      const response = await notesAPI.updateNote(id, noteData);
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note._id === id ? response.data.data : note
        )
      );
      setEditingNote(null);
      return { success: true };
    } catch (error) {
      console.error('Error updating note:', error);
      const errorMessage = error.response?.data?.error || 'Failed to update note';
      return { success: false, error: errorMessage };
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await notesAPI.deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  // Start editing a note
  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">
            📝 Notes Keeper
          </h1>
          <p className="app-subtitle">Keep your thoughts organized</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Add Note Section */}
          <section className="add-note-section">
            <AddNote onAddNote={handleAddNote} />
          </section>

          {/* Edit Note Modal */}
          {editingNote && (
            <EditNote
              note={editingNote}
              onUpdateNote={handleUpdateNote}
              onCancel={handleCancelEdit}
            />
          )}

          {/* Notes List Section */}
          <section className="notes-section">
            <div className="notes-header">
              <h2>Your Notes ({notes.length})</h2>
              <button 
                onClick={fetchNotes} 
                className="refresh-btn"
                disabled={loading}
              >
                {loading ? '🔄' : '↻'} Refresh
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <p>{error}</p>
                <button onClick={fetchNotes} className="retry-btn">
                  Retry
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="loading-message">
                <p>Loading your notes...</p>
              </div>
            )}

            {/* Notes List */}
            {!loading && !error && (
              <NoteList
                notes={notes}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025 Notes Keeper. Built with MERN Stack.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;