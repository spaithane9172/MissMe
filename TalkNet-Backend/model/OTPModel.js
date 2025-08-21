import mongoose from "mongoose";
import OTPSchema from "../schema/OTPSchema.js";
const OTPModel = mongoose.model("OTPModel", OTPSchema);
export default OTPModel;
