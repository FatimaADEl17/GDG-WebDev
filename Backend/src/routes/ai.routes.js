// src/routes/ai.routes.js
const express = require("express");
const router = express.Router();

const { testAI } = require("../controllers/ai.controller");

// GET /api/test
router.get("/test", testAI);

module.exports = router;