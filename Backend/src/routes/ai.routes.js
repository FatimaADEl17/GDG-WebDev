const express = require("express");
const { getFamilyFeud } = require("../controllers/ai.controller");

const router = express.Router();

router.get("/family-feud", getFamilyFeud);

module.exports = router;