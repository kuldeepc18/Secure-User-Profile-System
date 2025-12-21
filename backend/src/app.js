const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // ✅ REQUIRED

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
