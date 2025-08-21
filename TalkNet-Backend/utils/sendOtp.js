import nodemailer from "nodemailer";
import OTPModel from "../model/OTPModel.js";

const generateAndSendOtp = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });
    const otp = Math.floor(100000 + Math.random() * 900000);

    const info = await transporter.sendMail({
      from: `"MissMe Chat" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Verify Your Email for MissMe.",
      text: `Hello,

Thank you for signing up for MissMe! To complete your registration, please use the One-Time Password (OTP) below to verify your email address:

Your OTP: ${otp}

This code will expire in 10 minutes, so please use it promptly. If you didn’t request this, you can safely ignore this email.

Best regards,
The MissMe Team`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;">
      <h2 style="color:#881337;">MissMe - Email Verification</h2>
      <p>Thank you for signing up for MissMe! To complete your registration, please use the One-Time Password (OTP) below to verify your email address:</p>
      <p style="font-weight:bold; font-size:18px;">Your OTP: ${otp}</p>
      <p>This code will expire in 10 minutes, so please use it promptly. If you didn’t request this, you can safely ignore this email.
<br>
Best regards,<br>
The MissMe Team <br>
      </p>
      </div>`,
    });
    if (!info || !info.response.includes("OK")) {
      return false;
    }

    await OTPModel.create({
      email: email,
      OTP: otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    return true;
  } catch (error) {
    return false;
  }
};

export { generateAndSendOtp };
