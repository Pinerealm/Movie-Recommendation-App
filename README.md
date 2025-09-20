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

- User registration and login with JWT authentication.
- Browse and search for movies from The Movie Database (TMDb) API.
- View detailed information for each movie.
- Add and remove movies from a personal watchlist.
- Get movie recommendations (to be implemented).

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm (v8 or later)
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- A TMDb API key

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

## API Endpoints

All endpoints are prefixed with `/api`.

### User Endpoints (`/api/users`)

- `POST /register`: Register a new user.
  - **Body**: `{ "name": "...", "email": "...", "password": "..." }`
- `POST /login`: Authenticate a user and get a token.
  - **Body**: `{ "email": "...", "password": "..." }`
- `GET /profile`: Get the current user's profile (Protected).
- `PUT /profile`: Update the current user's profile (Protected).

### Movie Endpoints (`/api/movies`)

- `GET /popular`: Get a list of popular movies from TMDb.
- `GET /search`: Search for movies by a query string.
  - **Query Param**: `?query=...`
- `GET /:id`: Get detailed information for a specific movie by its TMDb ID.

### Favorites Endpoints (`/api/users/favorites`)

- `GET /`: Get the user's favorite movies (Protected).
- `POST /`: Add a movie to favorites (Protected).
  - **Body**: `{ "movieId": "..." }`
- `DELETE /:movieId`: Remove a movie from favorites by its TMDb ID (Protected).

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
