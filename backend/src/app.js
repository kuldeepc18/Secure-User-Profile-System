const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

module.exports = app;