# Frontend

This package contains the React-based frontend for the Movie Recommendation App. It is built with Vite and uses modern frontend technologies to provide a fast, responsive, and user-friendly interface.

## Features

- **Component-Based Architecture**: Built with reusable React components for maintainability and scalability.
- **Responsive Design**: A mobile-first design that adapts to various screen sizes, from desktops to mobile devices.
- **CSS Modules**: Scoped CSS for individual components to avoid style conflicts.
- **Client-Side Routing**: Uses `react-router-dom` for seamless navigation between pages without full-page reloads.
- **State Management**: Utilizes React hooks for efficient state management.
- **API Integration**: Communicates with the backend API to fetch movie data, manage user authentication, and handle user interactions.
- **Protected Routes**: Ensures that only authenticated users can access certain pages and features.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)

### Installation

1. **Navigate to the root of the monorepo.**

2. **Install all dependencies:**

   ```bash
   pnpm install
   ```

   This command installs dependencies for both the frontend and backend.

## Usage

To run the frontend development server, execute the following command from the **root directory** of the project:

```bash
pnpm dev
```

The Vite development server will start, typically on `http://localhost:5173`. The frontend is configured to proxy API requests from `/api` to the backend server, which is expected to be running on `http://localhost:5001`.

## Project Structure

- `src/components`: Contains reusable UI components like `Header`, `MovieCard`, and `SearchBar`.
- `src/pages`: Contains the main pages of the application, such as `Home`, `Login`, `MovieDetails`, and `Profile`.
- `src/services`: Includes functions for making API calls to the backend (e.g., `movieService.js`, `userService.js`).
- `src/utils`: Contains utility functions, such as `setAuthToken.js` for handling JWT authentication headers.
- `src/App.jsx`: The main application component where routing is configured.
- `vite.config.js`: Vite configuration file, including the proxy setup for API requests.
