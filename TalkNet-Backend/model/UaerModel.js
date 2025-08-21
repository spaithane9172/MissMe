import mongoose from "mongoose";
import UserSchema from "../schema/UserSchema.js";

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
