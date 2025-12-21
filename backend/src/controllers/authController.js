const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { encrypt } = require("../utils/encryption");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, aadhaar } = req.body;

        // Basic validation
        if (!name || !email || !password || !aadhaar) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Encrypt Aadhaar
        const encryptedAadhaar = encrypt(aadhaar);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            aadhaar: encryptedAadhaar
        });

        res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};



const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = { registerUser, loginUser };

