# API Reference

All endpoints are prefixed with `/api` and return JSON responses. Protected routes require a valid JWT supplied via the `Authorization: Bearer <token>` header.

## User Endpoints (`/users`)

| Method | Endpoint              | Protection | Description                               |
| ------ | --------------------- | ---------- | ----------------------------------------- |
| POST   | `/register`           | No         | Register a new user                       |
| POST   | `/login`              | No         | Authenticate a user and return a token    |
| GET    | `/profile`            | Yes        | Fetch the authenticated user's profile    |
| PUT    | `/profile`            | Yes        | Update the authenticated user's profile   |
| GET    | `/favorites`          | Yes        | Retrieve the user's list of favorite movies |
| POST   | `/favorites`          | Yes        | Add a movie to the user's favorites       |
| DELETE | `/favorites/:movieId` | Yes        | Remove a movie from the user's favorites  |

### Favorites Examples (`/api/users/favorites`)

- `GET /`: Get the user's favorite movies with full movie details (Protected).
- `POST /`: Add a movie to favorites (Protected).  
  **Body**: `{ "movieId": "123" }` (TMDb movie ID as number)
- `DELETE /:movieId`: Remove a movie from favorites by its TMDb ID (Protected).

## Movie Endpoints (`/movies`)

| Method | Endpoint           | Protection | Description                               |
| ------ | ------------------ | ---------- | ----------------------------------------- |
| GET    | `/`                | No         | Get a list of popular movies              |
| GET    | `/search`          | No         | Search for movies by a query title        |
| GET    | `/recommendations` | Yes        | Get personalized recommendations          |
| GET    | `/:id`             | No         | Get detailed information for a single movie |

## Review Endpoints (`/movies/:movieId/reviews`)

| Method | Endpoint | Protection | Description                          |
| ------ | -------- | ---------- | ------------------------------------ |
| POST   | `/`      | Yes        | Add a new review for a movie         |
| GET    | `/`      | No         | Get all reviews for a specific movie |
| GET    | `/user`  | Yes        | Get the user's review for a movie    |
| PUT    | `/:id`   | Yes        | Update a specific review             |
| DELETE | `/:id`   | Yes        | Delete a specific review             |

### Review Payload

```json
{
  "rating": 5,
  "comment": "Great movie!"
}
```

## Watchlist Endpoints (`/watchlists`)

| Method | Endpoint        | Protection | Description                               |
| ------ | --------------- | ---------- | ----------------------------------------- |
| POST   | `/`             | Yes        | Create a new watchlist                    |
| GET    | `/`             | Yes        | Get all watchlists for the user           |
| GET    | `/:id`          | Yes        | Get a single watchlist by its ID          |
| PUT    | `/:id`          | Yes        | Update a watchlist's details              |
| DELETE | `/:id`          | Yes        | Delete a watchlist                        |
| POST   | `/:id/movies`   | Yes        | Add a movie to a specific watchlist       |
| DELETE | `/:id/movies`   | Yes        | Remove a movie from a specific watchlist  |

### Watchlist Payloads

- **Add movie**

  ```json
  {
    "movieId": 123
  }
  ```

- **Remove movie**

  ```json
  {
    "movieId": 123
  }
  ```
