const express = require("express");
const router = express.Router();
const { authControllers } = require("../../controllers");

router.post("/login", authControllers.loginUser);

router.post("/register-user", authControllers.registerUser);

module.exports = router;
