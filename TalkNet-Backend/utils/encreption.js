import crypto from "crypto";
const ALGORITHM = "aes-256-gcm";

const encryption = (message, secret) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, secret, iv);
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return { encrypted, iv: iv.toString("hex"), authTag };
};

const decryption = (encrypted, iv, authTag, secret) => {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    secret,
    Buffer.from(iv, "hex")
  );
  decipher.setAuthTag(Buffer.from(authTag, "hex"));
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
export { encryption, decryption };
