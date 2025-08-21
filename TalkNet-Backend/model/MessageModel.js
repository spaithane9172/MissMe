import mongoose from "mongoose";
import MessageSchema from "../schema/MessagesSchema.js";

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
