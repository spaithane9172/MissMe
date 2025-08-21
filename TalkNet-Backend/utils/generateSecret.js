import crypto from "crypto";

const generateSecret = (sender, receiver) => {
  const ids = [sender, receiver].sort().join(":");
  return crypto.createHash("sha256").update(ids).digest();
};
export default generateSecret;
