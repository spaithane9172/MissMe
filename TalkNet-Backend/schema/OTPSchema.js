import mongoose from "mongoose";

const OTPSchema = mongoose.Schema({
  OTP: { type: String, required: true },
  email: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default OTPSchema;
