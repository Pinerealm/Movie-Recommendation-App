# Movie Recommendation App

This is a full-stack movie recommendation application built with the MERN stack (MongoDB, Express, React, Node.js) and organized as a pnpm monorepo. It allows users to discover movies, manage a watchlist, and get recommendations.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Complete user registration and login system with JWT authentication
- **Movie Discovery**: Browse popular movies and search for specific titles using The Movie Database (TMDb) API
- **Movie Details**: View comprehensive movie information including ratings, genres, release dates, and overview
- **Favorites Management**: Add and remove movies from your personal favorites list with real-time updates
- **User Profile**: Dedicated profile page displaying user information and favorite movies collection
- **Responsive Design**: Modern glassmorphism UI that works seamlessly on desktop and mobile devices
- **Protected Routes**: Secure access to user-specific features with authentication checks

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm (v8 or later)
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- A TMDb API key (get one from [The Movie Database](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Pinerealm/Movie-Recommendation-App.git
   cd Movie-Recommendation-App
   ```

2. **Install dependencies from the root directory:**

   This command installs dependencies for both the frontend and backend workspaces.

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `packages/backend` directory. Set the backend port to 5001 to align with the frontend's Vite proxy configuration.

   ```env
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   PORT=5001
   TMDB_API_KEY=<your_tmdb_api_key>
   ```

## Usage

### Development

To run both the frontend and backend servers concurrently in development mode, run the following command from the root directory:

```bash
pnpm dev
```

- The backend server (with nodemon) will start on `http://localhost:5001`.
- The frontend Vite dev server will start on a different port (e.g., `http://localhost:5173`) and will proxy API requests from `/api` to the backend.

### Production

1. **Build the frontend:**

   ```bash
   pnpm build
   ```

2. **Start the backend server:**

   ```bash
   pnpm start
   ```

   The backend will serve the application.

## Recent Updates

### v2.0 - User Profile & Favorites Management

- ✅ **Complete User Profile System**: Dedicated profile page with user information display
- ✅ **Advanced Favorites Management**: Real-time add/remove favorites with visual feedback
- ✅ **Enhanced Movie Cards**: Interactive favorite buttons with loading states and animations
- ✅ **Improved Movie Details**: Modern UI with comprehensive movie information and favorites integration
- ✅ **Protected Routes**: Secure access to user-specific features
- ✅ **Responsive Design**: Glassmorphism UI theme that works on all devices
- ✅ **Code Optimization**: Eliminated redundant code and improved maintainability

### Development Improvements

- Consolidated duplicate API call patterns
- Enhanced error handling consistency
- Improved authentication state management
- Modern CSS with glassmorphism design patterns

## API Endpoints

All endpoints are prefixed with `/api`.

### User Endpoints (`/api/users`)

- `POST /register`: Register a new user.
  - **Body**: `{ "name": "...", "email": "...", "password": "..." }`
- `POST /login`: Authenticate a user and get a token.
  - **Body**: `{ "email": "...", "password": "..." }`
- `GET /profile`: Get the current user's profile (Protected).
- `PUT /profile`: Update the current user's profile (Protected).
  - **Body**: `{ "name": "...", "email": "...", "password": "..." }` (all fields optional)

### Movie Endpoints (`/api/movies`)

- `GET /popular`: Get a list of popular movies from TMDb.
- `GET /search`: Search for movies by a query string.
  - **Query Param**: `?query=...`
- `GET /:id`: Get detailed information for a specific movie by its TMDb ID.

### Favorites Endpoints (`/api/users/favorites`)

- `GET /`: Get the user's favorite movies with full movie details (Protected).
- `POST /`: Add a movie to favorites (Protected).
  - **Body**: `{ "movieId": "123" }` (TMDb movie ID as number)
- `DELETE /:movieId`: Remove a movie from favorites by its TMDb ID (Protected).

## Project Structure

```text
Movie-Recommendation-App/
├── packages/
│   ├── backend/                 # Express.js API server
│   │   ├── controllers/         # Route handlers
│   │   ├── middleware/          # Auth & error middleware
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API routes
│   │   ├── services/           # External API services (TMDb)
│   │   └── utils/              # Utility functions
│   └── frontend/               # React SPA
│       ├── src/
│       │   ├── components/     # Reusable UI components
│       │   ├── pages/          # Route components
│       │   ├── services/       # API client functions
│       │   └── utils/          # Helper utilities
│       └── public/
├── pnpm-workspace.yaml         # Workspace configuration
└── package.json               # Root package scripts
```

## Key Technologies

- **Frontend**: React 18, React Router, Vite, CSS Modules
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **External API**: The Movie Database (TMDb) API
- **Package Manager**: pnpm with workspace support
- **Development**: Nodemon, Concurrently for dev workflow

## Troubleshooting

### Common Issues

1. **"Failed to connect to MongoDB"**
   - Ensure MongoDB is running locally or your Atlas connection string is correct
   - Check that your `MONGO_URI` in the `.env` file is properly formatted

2. **"API requests failing in development"**
   - Verify the backend is running on port 5001
   - Check that Vite proxy configuration in `vite.config.js` points to `http://localhost:5001`

3. **"Authentication not working"**
   - Make sure `JWT_SECRET` is set in your `.env` file
   - Check browser developer tools for token-related errors

4. **"TMDb API errors"**
   - Verify your `TMDB_API_KEY` is valid and active
   - Check the TMDb API documentation for rate limits

### Development Tips

- Use `pnpm dev` from the root directory to run both frontend and backend simultaneously
- Backend runs on port 5001, frontend on port 5173 (or next available)
- Check browser console and terminal output for detailed error messages
- MongoDB connection logs appear in the backend terminal

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License.
