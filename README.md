# Movie Recommendation App

This is a full-stack movie recommendation application that allows users to discover new movies, create a watchlist, and get recommendations based on their preferences.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
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

## Tech Stack

**Frontend:**

- React
- React Router
- Vite
- CSS

**Backend:**

- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication

## Project Structure

The project is a monorepo managed with pnpm workspaces.

- `packages/frontend`: The React frontend application.
- `packages/backend`: The Node.js/Express backend API.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- pnpm
- MongoDB instance (local or cloud)
- A TMDb API key

### Installation

1. **Clone the repository if needed:**

   ```bash
   git clone https://github.com/your-username/movie-recommendation-app.git
   cd movie-recommendation-app
   ```

2. **Install dependencies:**

   This command will install dependencies for both the frontend and backend.

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `packages/backend` directory and add the following variables:

   ```bash
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   PORT=5000
   TMDB_API_KEY=<your_tmdb_api_key>
   ```

## Usage

1. **Start the backend server:**

   ```bash
   # For production
   pnpm start

   # For development with nodemon
   pnpm --filter backend dev
   ```

   The backend will be running at `http://localhost:5000`.

2. **Start the frontend development server:**

   ```bash
   pnpm dev
   ```

   The frontend will be running at `http://localhost:5173`.

## API Endpoints

### User Routes

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in a user.
- `GET /api/users/me`: Get the current user's profile.

### Movie Routes

- `GET /api/movies/popular`: Get popular movies.
- `GET /api/movies/search?query=<search_term>`: Search for movies.
- `GET /api/movies/:id`: Get details for a specific movie.

### Watchlist Routes

- `GET /api/watchlist`: Get the user's watchlist.
- `POST /api/watchlist`: Add a movie to the watchlist.
- `DELETE /api/watchlist/:id`: Remove a movie from the watchlist.

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
