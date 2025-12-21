const crypto = require("crypto");

const algorithm = "aes-256-cbc";

// Convert secret key into 32-byte key
const key = crypto
    .createHash("sha256")
    .update(process.env.ENCRYPTION_KEY)
    .digest();

const encrypt = (text) => {
    const iv = crypto.randomBytes(16); // Initialization Vector
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
};

const decrypt = (encryptedText) => {
    const [ivHex, encryptedData] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
};

module.exports = { encrypt, decrypt };
