import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth token (future use)
api.interceptors.request.use(
  (config) => {
    // Add auth token to requests when implementing authentication
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Notes API functions
export const notesAPI = {
  // Get all notes
  getAllNotes: () => api.get('/notes'),
  
  // Get a single note by ID
  getNoteById: (id) => api.get(`/notes/${id}`),
  
  // Create a new note
  createNote: (noteData) => api.post('/notes', noteData),
  
  // Update a note by ID
  updateNote: (id, noteData) => api.put(`/notes/${id}`, noteData),
  
  // Delete a note by ID
  deleteNote: (id) => api.delete(`/notes/${id}`),
};

export default api;