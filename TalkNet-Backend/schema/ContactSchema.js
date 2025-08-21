import mongoose from "mongoose";

const ContactSchema = mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted"],
    default: "Pending",
  },
  block: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, required: true },
      blockedAt: { type: Date, default: null },
    },
  ],
});

export default ContactSchema;
