const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const aiRoutes = require("./routes/ai.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/ai", aiRoutes);

// Error middleware
app.use(errorMiddleware);

module.exports = app;

//word grid
const wordGridRoutes = require("./routes/wordGrid.routes");
app.use("/word-grid", wordGridRoutes);