# Movie Recommendation App

This is a full-stack movie recommendation application built with the MERN stack (MongoDB, Express, React, Node.js) and organized as a pnpm monorepo. It allows users to discover movies, manage a watchlist, and get recommendations.

## Table of Contents

- [Features](#features)
- [Documentation](#documentation)
- [Getting Started](#getting-started)
- [Quick Start](#quick-start)
- [Scripts & Tooling](#scripts--tooling)
- [Project Structure](#project-structure)
- [Key Technologies](#key-technologies)
- [Architecture Overview](#architecture-overview)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Movie Reviews**: Users can write, edit, and delete reviews for movies
- **Movie Recommendations**: Get personalized movie recommendations based on favorite genres
- **User Authentication**: Complete user registration and login system with JWT authentication
- **Movie Discovery**: Browse popular movies and search for specific titles using The Movie Database (TMDb) API
- **Movie Details**: View comprehensive movie information including ratings, genres, release dates, and overview
- **Favorites Management**: Add and remove movies from your personal favorites list with real-time updates
- **User Profile**: Dedicated profile page displaying user information and favorite movies collection
- **Watchlist Management**: Create, view, and manage multiple movie watchlists
- **Responsive Design**: Modern glassmorphism UI that works seamlessly on desktop and mobile devices
- **Protected Routes**: Secure access to user-specific features with authentication checks

## Documentation

- [API Reference](docs/api-reference.md)
- [Troubleshooting Guide](docs/troubleshooting.md)
- [Changelog](CHANGELOG.md)

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

   ```bash
   pnpm install
   ```

   This command installs dependencies for both the frontend and backend workspaces.

3. **Set up environment variables:**

   Create a `.env` file in the `packages/backend` directory. Set the backend port to 5001 to align with the frontend's Vite proxy configuration.

   ```env
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   PORT=5001
   TMDB_API_KEY=<your_tmdb_api_key>
   ```

## Quick Start

### Development

Run both the frontend and backend servers concurrently from the repository root:

```bash
pnpm dev
```

- Backend (nodemon) listens on `http://localhost:5001`.
- Frontend (Vite) serves on `http://localhost:5173` and proxies `/api` to the backend.

### Production Preview

1. Build the frontend bundle:

   ```bash
   pnpm build
   ```

2. Start the backend in production mode:

   ```bash
   pnpm start
   ```

   The backend serves the static assets from the built frontend.

## Scripts & Tooling

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the Vite dev server and Express backend together with live reload. |
| `pnpm --filter frontend dev` | Runs only the frontend in development mode. |
| `pnpm --filter backend dev` | Runs only the backend with nodemon. |
| `pnpm build` | Builds the production-ready frontend bundle. |
| `pnpm start` | Starts the backend in production mode (expects the frontend bundle to be pre-built). |
| `pnpm --filter frontend preview` | Serves the built frontend locally for smoke testing. |
| `pnpm --filter frontend lint` | Lints the frontend source. |
| `pnpm --filter backend lint` | Lints the backend source. |

Consider adding these lint commands to CI to keep code quality consistent across the monorepo.

## Project Structure

```text
Movie-Recommendation-App/
├── packages/
│   ├── backend/                 # Express.js API server
│   │   ├── config/             # Database configuration
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

- **Frontend**: React 19, React Router, Vite, CSS Modules
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **External API**: The Movie Database (TMDb) API
- **Package Manager**: pnpm with workspace support
- **Development**: Nodemon, Concurrently for dev workflow

## Architecture Overview

- **Frontend (`packages/frontend`)**: A Vite-powered React SPA that handles routing, state, and user interactions. It relies on React Query for data fetching and caching.
- **Backend (`packages/backend`)**: An Express server that exposes REST endpoints, orchestrates TMDb API calls via the `tmdbService`, and persists user-generated data in MongoDB.
- **Shared Contract**: API calls flow through Axios on the client, hitting `/api/*` routes that the Vite dev server proxies to the backend. Authentication uses JWTs stored in `localStorage` and injected via `setAuthToken`.
- **Data Sources**: Movie metadata is sourced live from TMDb; user-specific artifacts (profiles, favorites, watchlists, reviews) are persisted in MongoDB collections.

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
