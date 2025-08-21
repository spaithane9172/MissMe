import express from "express";
import Authenticate from "../middleware/Authenticate.js";
import MessageModel from "../model/MessageModel.js";
import { encryption, decryption } from "../utils/encreption.js";
import generateSecret from "../utils/generateSecret.js";

const router = express.Router();
router.post("/getMessages", Authenticate, async (request, response) => {
  try {
    const { _id } = request.user;
    const { friend } = request.body;

    if (!friend) {
      return response.status(400).json({ messsage: "Something went wrong." });
    }
    const messages = await MessageModel.find({
      $or: [
        { sender: _id, receiver: friend },
        { sender: friend, receiver: _id },
      ],
    }).sort({ createdAt: 1 });
    const secret = generateSecret(_id, friend);
    const decryptedMessages = messages.map((msg) => {
      return {
        ...msg._doc,
        message: decryption(msg.message, msg.iv, msg.authTag, secret),
      };
    });

    return response.status(200).json({ messages: decryptedMessages });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
});

router.post("/sendMessage", Authenticate, async (request, response) => {
  try {
    const { receiverId, message } = request.body;
    const { _id } = request.user;

    if (!receiverId || !message) {
      return response.status(400).json({ message: "Invalid message." });
    }
    const secret = generateSecret(_id, receiverId);
    const encryptedMessage = encryption(message, secret);
    const newMessage = await MessageModel.create({
      sender: _id,
      receiver: receiverId,
      message: encryptedMessage.encrypted,
      iv: encryptedMessage.iv,
      authTag: encryptedMessage.authTag,
    });

    request.io.to(receiverId).emit("receiveMessage", {
      _id: newMessage._id,
      sender: _id,
      receiver: receiverId,
      message,
    });
    return response
      .status(200)
      .json({ messageStatus: true, message: "Message sent." });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
});

router.put("/updateMessage", Authenticate, async (request, response) => {
  try {
    const { _id, message, receiverId } = request.body;
    if (!_id || !message) {
      return response.status(400).json({ message: "Invalid message." });
    }
    const msg = await MessageModel.findOne({
      _id,
      sender: request.user._id,
    });

    if (msg) {
      const secret = generateSecret(request.user._id, receiverId);
      const encryptedMessage = encryption(message, secret);
      msg.message = encryptedMessage.encrypted;
      msg.iv = encryptedMessage.iv;
      msg.authTag = encryptedMessage.authTag;
      msg.save();
      return response.status(200).json({ message: "Message updated." });
    } else {
      return response.status(400).json({ message: "Something went wrong." });
    }
  } catch (error) {}
});

router.put("/clearChat", Authenticate, async (request, response) => {
  try {
    const { _id } = request.user;
    const { friendId } = request.body;

    if (!friendId) {
      return response.status(400).json({ message: "Friend id messing." });
    }
    await MessageModel.deleteMany({
      $or: [
        {
          sender: _id,
          receiver: friendId,
        },
        { sender: friendId, receiver: _id },
      ],
      deletedFor: friendId,
    });

    const messages = await MessageModel.updateMany(
      {
        $or: [
          { receiver: friendId, sender: _id },
          { receiver: _id, sender: friendId },
        ],
      },
      { $addToSet: { deletedFor: _id } }
    );
    return response.status(200).json({ message: "Messages Cleared." });
  } catch (error) {
    return response.status(500).json({ message: "It's not you. It's us." });
  }
});
// but when second user clear its chat then msg must be deleted

router.delete(
  "/deleteMessage/:_id",
  Authenticate,
  async (request, response) => {
    try {
      const { _id } = request.params;
      if (!_id) {
        return response
          .status(400)
          .json({ message: "Something went wrong. Try again." });
      }
      const message = await MessageModel.findOne({ _id });
      if (message.deletedFor.length > 0) {
        await MessageModel.deleteOne({ _id });
      } else {
        message.deletedFor.push(request.user._id);
        message.save();
      }

      return response.status(200).json({ message: "Message deleted." });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Something went wrong. Try again." });
    }
  }
);

router.delete(
  "/deleteForEveryone/:_id",
  Authenticate,
  async (request, response) => {
    try {
      const { _id } = request.params;
      if (!_id) {
        return response
          .status(400)
          .json({ message: "Something went wrong. Try again." });
      }
      await MessageModel.deleteOne({ _id, sender: request.user._id });

      return response.status(200).json({ message: "Message deleted." });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Something went wrong. Try again." });
    }
  }
);

//code for seen message logic

router.post("/messageSeen", Authenticate, async (request, response) => {
  try {
    const { sender } = request.body;
    const { _id } = request.user;
    if (!sender) {
      return response.status(400).json({ message: "Sender id not found." });
    }

    const messages = await MessageModel.updateMany(
      { receiver: _id, sender },
      { $set: { messageSeen: true } }
    );
    return response.status(200).json({ message: "Message marked as seen." });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Something went wrong. Try again" });
  }
});

export default router;
