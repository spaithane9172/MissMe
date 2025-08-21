import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../model/UaerModel.js";
import OTPModel from "../model/OTPModel.js";
import jwt from "jsonwebtoken";
import Authenticate from "../middleware/Authenticate.js";
import { generateAndSendOtp } from "../utils/sendOtp.js";

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    if (!firstName || !lastName || !email || !password) {
      return response.status(400).json({ message: "All fields required." });
    }
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return response.status(400).json({ message: "User Already Existing." });
    }
    const passwordWithPaper = password + process.env.PAPER;
    const encryptedPassword = await bcrypt.hash(passwordWithPaper, 10);
    await UserModel.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });
    return response.status(200).json({ message: "Registration Successful." });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error });
  }
});

router.post("/sendOtp", async (request, response) => {
  try {
    let { email } = request.body;
    if (!email) {
      return response.status(400).json({ message: "Enter valid email" });
    }

    email = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response.status(400).json({ message: "Invalid email address" });
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return response.status(400).json({ message: "Email already used." });
    }
    const status = await generateAndSendOtp(email);
    if (status) {
      return response.status(200).json({ message: "OTP sent successfully." });
    } else {
      return response.status(400).json({ message: "Faild to send OTP." });
    }
  } catch (error) {
    return response.status(500).json({ message: "Faild to send OTP" });
  }
});

router.post("/verifyOtp", async (request, response) => {
  try {
    const { otp, email } = request.body;
    if (!otp || !email) {
      return response.status(400).json({ message: "Invalid OTP." });
    }
    const existing = await OTPModel.findOne({ email });
    if (!existing) {
      return response.status(400).json({ message: "OTP expired." });
    }
    if (existing.expiresAt < Date.now()) {
      await OTPModel.deleteOne({ _id: existing._id });
      return response.status(400).json({ message: "Otp expired." });
    }
    if (existing.OTP === otp) {
      await OTPModel.deleteOne({ _id: existing._id });
      return response
        .status(200)
        .json({ verified: true, message: "Email verified successfully." });
    } else {
      return response.status(400).json({
        verified: false,
        message: "Email verification faild try again",
      });
    }
  } catch (error) {
    return response.json({ message: "Something went wrong. Try again." });
  }
});

router.post("/resendOtp", async (request, response) => {
  try {
    let { email } = request.body;
    if (!email) {
      return response.status(400).json({ message: "Something wrong." });
    }

    email = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response.status(400).json({ message: "Invalid email address" });
    }

    const existing = await OTPModel.findOne({ email });
    if (existing) {
      await OTPModel.deleteOne({ _id: existing._id });
    }
    const status = await generateAndSendOtp(email);
    if (status) {
      return response.status(200).json({ message: "OTP sent successfully." });
    } else {
      return response.status(400).json({ message: "Faild to send OTP." });
    }
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Something went wrong. Try again" });
  }
});

const createAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};
const createRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({ message: "Invalid Credentials." });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({ message: "Invalid Credentials." });
    }

    const passwordWithPaper = password + process.env.PAPPER;

    const isPasswordValid = await bcrypt.compare(
      passwordWithPaper,
      user.password
    );

    if (!isPasswordValid) {
      return response.status(400).json({ message: "Invalid Credentials." });
    }

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return response.status(200).json({ message: "Login successful." });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
});

router.get("/userDetails", Authenticate, async (request, response) => {
  try {
    const { _id } = request.user;
    const user = await UserModel.findOne({ _id });
    if (!user) {
      return response.status(401).json({ message: "Unautherized." });
    }

    return response.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong." });
  }
});

router.put("/updateUser", Authenticate, async (request, response) => {
  try {
    const { _id } = request.user;
    const { firstName, lastName } = request.body;
    if (!lastName || !firstName) {
      return response.status(400).json({ message: "Invalid Input." });
    }

    const user = await UserModel.findOne({ _id });
    if (!user) {
      return response.status(400).json({ message: "User not found." });
    }
    user.firstName = firstName;
    user.lastName = lastName;

    await user.save();

    return response.status(200).json({
      message: "Datails updated successfully.",
      user: {
        firstName,
        lastName,
        emal: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
});

export default router;
