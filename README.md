# 📝 Notes Keeper - MERN Stack Application

A beautiful, responsive notes management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Keep your thoughts organized with a clean, Google Keep-inspired interface.

![Notes Keeper](https://img.shields.io/badge/MERN-Stack-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📝 **Create Notes**: Add new notes with title and description
- 👀 **View Notes**: See all your notes in a beautiful grid layout
- ✏️ **Edit Notes**: Update existing notes with inline editing
- 🗑️ **Delete Notes**: Remove notes with confirmation
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ⚡ **Real-time Updates**: Instant UI updates with proper error handling
- 🎨 **Beautiful UI**: Modern design with smooth animations

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **React.js** - User interface library
- **Axios** - HTTP client for API calls
- **React Icons** - Beautiful icons
- **CSS3** - Modern styling with animations

## 📁 Project Structure

```
vysh-mern/
├── backend/
│   ├── models/
│   │   └── Note.js          # Mongoose Note model
│   ├── routes/
│   │   └── noteRoutes.js    # API routes for CRUD operations
│   ├── server.js            # Express server setup
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
│
└── frontend/
    ├── public/
    │   ├── index.html       # HTML template
    │   └── manifest.json    # PWA manifest
    ├── src/
    │   ├── components/
    │   │   ├── AddNote.jsx      # Add new note component
    │   │   ├── EditNote.jsx     # Edit note modal
    │   │   ├── NoteList.jsx     # Notes list container
    │   │   └── NoteCard.jsx     # Individual note card
    │   ├── services/
    │   │   └── api.js           # API service with Axios
    │   ├── App.js               # Main App component
    │   ├── index.js             # React entry point
    │   ├── App.css              # App-specific styles
    │   └── index.css            # Global styles
    └── package.json             # Frontend dependencies
```

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd vysh-mern
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**

Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/notes-keeper
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-keeper
```

### 🖥️ Running the Application

#### Start the Backend Server
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:5000`

#### Start the Frontend Development Server
```bash
cd frontend
npm start
```
The React app will start on `http://localhost:3000`

### 🗄️ Database Setup

#### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   - Windows: `net start MongoDB`
   - macOS: `brew services start mongodb/brew/mongodb-community`
   - Linux: `sudo systemctl start mongod`

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `.env` file
4. Add your IP address to whitelist

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get note by ID |
| POST | `/api/notes` | Create new note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

### Example API Usage

#### Create a Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Note",
    "description": "This is the content of my note"
  }'
```

#### Get All Notes
```bash
curl http://localhost:5000/api/notes
```

## 🎨 Features in Detail

### 📝 Add Note Component
- Expandable input field (like Google Keep)
- Form validation
- Character count limits
- Loading states with spinners

### 📋 Note List
- Responsive grid layout
- Empty state handling
- Real-time updates
- Smooth animations

### ✏️ Edit Note Modal
- Overlay modal with backdrop blur
- Escape key to close
- Form pre-population
- Validation feedback

### 🗑️ Delete Functionality
- Confirmation dialog
- Optimistic UI updates
- Error handling with rollback

## 🎯 Development Scripts

### Backend Scripts
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

### Frontend Scripts
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create Heroku app: `heroku create your-app-name`
2. Set environment variables: `heroku config:set MONGODB_URI=your_uri`
3. Deploy: `git push heroku main`

### Frontend Deployment (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting platform
3. Set environment variable: `REACT_APP_API_URL=your_backend_url`

## 🛠️ Customization

### Adding New Fields to Notes
1. Update the Mongoose schema in `backend/models/Note.js`
2. Modify API routes in `backend/routes/noteRoutes.js`
3. Update React components to handle new fields

### Styling Customization
- Modify `frontend/src/index.css` for global styles
- Update color scheme by changing CSS custom properties
- Customize component styles in individual components

## 🐛 Troubleshooting

### Common Issues

1. **Backend server not starting**
   - Check MongoDB connection
   - Verify environment variables
   - Ensure port 5000 is available

2. **Frontend can't connect to backend**
   - Verify backend is running on port 5000
   - Check CORS configuration
   - Ensure API URLs are correct

3. **Database connection errors**
   - Verify MongoDB is running
   - Check connection string format
   - Ensure database permissions

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your `.env` file.

## 🔮 Future Enhancements

- [ ] User authentication with JWT
- [ ] Note categories and tags
- [ ] Search and filter functionality
- [ ] Rich text editor
- [ ] File attachments
- [ ] Note sharing
- [ ] Dark mode toggle
- [ ] Offline support with PWA

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Inspired by Google Keep's clean design
- Built with love using the MERN stack
- Icons by React Icons
- Fonts by Google Fonts

---

⭐ **Star this repository if you found it helpful!**