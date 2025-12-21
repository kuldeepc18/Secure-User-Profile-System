const User = require("../models/User");
const { decrypt } = require("../utils/encryption");

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Decrypt Aadhaar before sending
        const decryptedAadhaar = decrypt(user.aadhaar);

        res.json({
            name: user.name,
            email: user.email,
            aadhaar: decryptedAadhaar,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getUserProfile };
