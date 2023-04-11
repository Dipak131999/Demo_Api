const express = require("express");
const app = express();

const authRoutes = require("./auth.routes");
app.use("/auth", authRoutes);

module.exports = app;
