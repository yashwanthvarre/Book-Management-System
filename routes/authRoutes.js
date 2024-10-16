const express = require("express");
const { register, login } = require("../controllers/authoController");

const router = express.Router();

// Correct route paths
router.post("/register", register);
router.post("/login", login);

module.exports = router;
