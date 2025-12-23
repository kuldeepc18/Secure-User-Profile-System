const crypto = require("crypto");

function hashAadhaar(aadhaar) {
    return crypto.createHash("sha256").update(aadhaar).digest("hex");
}

module.exports = hashAadhaar;
