# Backend

This package contains the Node.js and Express backend for the Movie Recommendation App. It handles business logic, interacts with the MongoDB database, and communicates with the TMDb API.

## Features

- **RESTful API**: A well-structured API for managing users, movies, reviews, and watchlists.
- **Authentication**: JWT-based authentication to secure user-specific endpoints.
- **Database Integration**: Uses Mongoose to model and manage data in a MongoDB database.
- **External API Communication**: Fetches movie data from The Movie Database (TMDb) API.
- **Error Handling**: Centralized error handling middleware to manage and respond to errors gracefully.
- **ES Modules**: Written using modern ECMAScript modules.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- MongoDB instance (local or cloud)
- A TMDb API key

### Installation

1. **Navigate to the root of the monorepo.**

2. **Install all dependencies:**

   ```bash
   pnpm install
   ```

   This command installs dependencies for both the frontend and backend.

### Environment Variables

Create a `.env` file in the `packages/backend` directory with the following variables:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
PORT=5001
TMDB_API_KEY=<your_tmdb_api_key>
```

## Usage

To run the backend server in development mode (with nodemon), execute the following command from the **root directory** of the project:

```bash
pnpm dev
```

The server will start on the port specified in your `.env` file (e.g., `http://localhost:5001`).

To run **only** the backend service, use:

```bash
pnpm --filter backend dev
```

For a production-like run that skips nodemon, execute:

```bash
pnpm --filter backend start
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm --filter backend dev` | Starts the Express server with nodemon for hot reloads. |
| `pnpm --filter backend start` | Runs the Express server with Node in production mode. |
| `pnpm --filter backend lint` | Lints the backend source with ESLint. |

## Environment Reference

| Variable | Required | Description |
| --- | --- | --- |
| `MONGO_URI` | ✅ | Connection string for your MongoDB deployment. |
| `JWT_SECRET` | ✅ | Secret used to sign and verify JSON Web Tokens. |
| `PORT` | ⚙️ | Port the Express app listens on (defaults to `5001`). |
| `TMDB_API_KEY` | ✅ | API key for authenticating requests to TMDb. |

## Development Tips

- `packages/backend/services/tmdbService.js` centralizes all calls to TMDb. If you need new external data, add a helper here and import it in a controller.
- When adjusting MongoDB schemas, review corresponding controllers to ensure new fields are validated and returned in responses.
- Pair controller changes with unit tests or manual Postman suites that exercise the `/api/users`, `/api/movies`, `/api/watchlists`, and `/api/reviews` routes.

## Project Structure

- `controllers`: Contains the logic for handling incoming requests (e.g., `userController.js`, `movieController.js`).
- `models`: Defines the Mongoose schemas for the database collections (e.g., `userModel.js`, `reviewModel.js`).
- `routes`: Defines the API routes and connects them to the appropriate controllers.
- `services`: Includes logic for communicating with external services like the TMDb API.
- `middleware`: Contains custom middleware, such as for authentication and error handling.
- `config`: Includes configuration files, such as for the database connection.
- `index.js`: The entry point for the backend server.

## API Endpoints

For a detailed list of all available API endpoints, please refer to the [main README file](../../README.md#api-endpoints).
