// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const aiRoutes = require("./routes/ai.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (اختياري)
app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

// Routes
app.use("/api", aiRoutes);

// Error middleware (لازم يكون آخر شيء)
app.use(errorMiddleware);

module.exports = app;