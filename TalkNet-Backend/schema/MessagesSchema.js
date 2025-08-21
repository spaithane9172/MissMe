import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    iv: { type: String, required: true },
    authTag: { type: String, required: true },
    deletedFor: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    messageSeen: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default MessageSchema;
