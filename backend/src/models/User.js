const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        aadhaar: {
            type: String,
            required: true
        },
        hashedAadhaar: {
            type: String,
            unique: true,
        },

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
