const express = require("express");
const app = express();

const authenticateJWT = require("../../middleware/auth.middleware");

const authRoutes = require("./notes.routes");
app.use("/notes", authenticateJWT, authRoutes);

module.exports = app;
