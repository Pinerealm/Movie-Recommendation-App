# Movie Recommendation App

This is a full-stack movie recommendation application that allows users to discover new movies, create a watchlist, and get recommendations based on their preferences.

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

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- pnpm
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository if needed:**

   ```bash
   git clone https://github.com/your-username/movie-recommendation-app.git
   cd movie-recommendation-app
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `packages/backend` directory and add the following:

   ```bash
   TMDB_API_KEY=<your_tmdb_api_key>
   PORT=5000
   MONGO_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

### Available Scripts

- `pnpm dev`: Starts the frontend development server.
- `pnpm build`: Builds the frontend for production.
- `pnpm start`: Starts the backend server.
- `pnpm --filter backend dev`: Starts the backend server with nodemon for development.
