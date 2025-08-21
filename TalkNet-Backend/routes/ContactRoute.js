import express, { request, response } from "express";
import Authenticate from "../middleware/Authenticate.js";
import ContactModel from "../model/ContactModel.js";

const router = express.Router();

router.post("/addFriend", Authenticate, async (request, response) => {
  try {
    const { receiver } = request.body;
    const { _id } = request.user;
    if (!receiver) {
      return response.status(400).json({ message: "Receiver id is missing." });
    }
    const existing = await ContactModel.findOne({
      $or: [
        { sender: _id, receiver: receiver },
        { sender: receiver, receiver: _id },
      ],
    });
    if (existing) {
      return response
        .status(400)
        .json({ message: "Duplicate friend request." });
    }
    await ContactModel.create({
      receiver: receiver,
      sender: _id,
      status: "Pending",
    });
    return response.status(200).json({ message: "Friend request sent." });
  } catch (error) {
    return response.status(500).json({ message: "It's not you. It's Us" });
  }
});

router.get("/getFriends", Authenticate, async (request, response) => {
  try {
    const { _id } = request.user;
    const friends = await ContactModel.find({
      $or: [{ sender: _id }, { receiver: _id }],
    });
    return response.status(200).json({ friends });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
});

router.put("/acceptRequest", Authenticate, async (request, response) => {
  try {
    const { _id } = request.body;
    if (!_id) {
      return response.status(400).json({ message: "Request id is messing." });
    }
    await ContactModel.updateOne(
      { _id, receiver: request.user._id },
      { $set: { status: "Accepted" } }
    );
    return response
      .status(200)
      .json({ message: "Added to your friends list." });
  } catch (error) {
    return response.status(500).json("It's not you. It's us.");
  }
});

router.delete(
  "/rejectRequest/:_id",
  Authenticate,
  async (request, response) => {
    try {
      const { _id } = request.params;
      if (!_id) {
        return response
          .status(400)
          .json({ message: "Faild to reject friend request." });
      }
      await ContactModel.deleteOne({
        _id,
        $or: [{ receiver: request.user._id }, { sender: request.user._id }],
      });
      return response.status(200).json({ message: "friend request canceled." });
    } catch (error) {
      return response.status(500).json({ message: "It's not you. It's us." });
    }
  }
);

router.put("/blockFriend", Authenticate, async (request, response) => {
  try {
    const { friendId } = request.body;
    if (!friendId) {
      return response
        .status(400)
        .json({ message: "friendId is missing blocking friend failed." });
    }
    const friendRequest = await ContactModel.findOne({
      $or: [
        { sender: request.user._id, receiver: friendId },
        { sender: friendId, receiver: request.user._id },
      ],
    });
    if (!friendRequest) {
      return response
        .status(400)
        .json({ message: "friend connection is invalid." });
    }
    friendRequest.block.push({ user: request.user._id, blockedAt: Date.now() });
    await friendRequest.save();
    return response.status(200).json({ message: "Friend blocked." });
  } catch (error) {
    return response.status(500).json({ message: "It's not you. It's us." });
  }
});

router.put("/unblockFriend", Authenticate, async (request, response) => {
  try {
    const { friendId } = request.body;
    if (!friendId) {
      return response
        .status(400)
        .json({ message: "friendId is missing unblocking friend failed." });
    }
    const friendRequest = await ContactModel.findOne({
      $or: [
        { sender: request.user._id, receiver: friendId },
        { sender: friendId, receiver: request.user._id },
      ],
    });
    if (!friendRequest) {
      return response
        .status(400)
        .json({ message: "friend connection is invalid." });
    }
    friendRequest.block = friendRequest.block.filter(
      (friend) => friend.user.toString() !== request.user._id.toString()
    );
    await friendRequest.save();
    return response.status(200).json({ message: "Friend unblocked." });
  } catch (error) {
    return response.status(500).json({ message: "It's not you. It's us." });
  }
});

export default router;
