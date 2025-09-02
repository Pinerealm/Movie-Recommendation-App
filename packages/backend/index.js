import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send("Hello from the backend!");
});

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
