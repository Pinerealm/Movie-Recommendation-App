# Troubleshooting

A few common issues and their fixes when developing or running the Movie Recommendation App.

## "Failed to connect to MongoDB"

- Ensure MongoDB is running locally or your Atlas connection string is correct.
- Confirm that `MONGO_URI` in `packages/backend/.env` is properly formatted.

## "API requests failing in development"

- Verify the backend is running on port `5001`.
- Check that the Vite proxy configuration in `packages/frontend/vite.config.js` still targets `http://localhost:5001`.

## "Authentication not working"

- Make sure `JWT_SECRET` is set in your backend `.env` file.
- Inspect the browser developer tools for token-related errors or missing `Authorization` headers.

## "TMDb API errors"

- Confirm your `TMDB_API_KEY` is valid and active.
- Review the TMDb API documentation for rate limits and endpoint changes.

## Debugging Tips

- Run `pnpm dev` from the repository root to start both apps simultaneously.
- Backend logs (MongoDB connection, API errors) appear in the terminal running the backend.
- React Query Devtools can help you inspect cached network responses on the frontend.
