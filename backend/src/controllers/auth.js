import User from "../models/User.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import crypto from "crypto";
import mongoose from "mongoose";

export async function login(_, res) {
  res.status(200).json({ message: "Login successful" });
}

export async function register(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verifCode = String(crypto.randomInt(0, 1000000)).padStart(6, "0");
    const expVerifCode = Date.now() + 1000 * 60 * 15;

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      verifCode,
      expVerifCode,
    });

    await newUser.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Internal server error" });
    console.error("Error in register route", err);
  }
}

export async function logout(req, res) {
  req.logout((err) => {
    if (err) {
      return res.status(400).json({ message: "Logout unsuccessful" });
    }
    res.clearCookie("connect.sid", { path: "/" });
    return res.status(200).json({ message: "Logout successful" });
  });
}

export async function verifyEmail(req, res) {
  try {
    const { code, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    if (existingUser.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    if (existingUser.expVerifCode < Date.now()) {
      return res.status(400).json({ message: "Expired verification code" });
    }

    if (existingUser.verifCode !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    existingUser.isVerified = true;
    existingUser.expVerifCode = null;
    existingUser.verifCode = null;

    await existingUser.save();

    res.status(200).json({ message: "User verified successfully" });
  } catch (err) {
    console.error("Error in verify-email route", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMe(req, res) {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({
      username: req.user.username,
      email: req.user.email,
      isVerified: req.user.isVerified,
    });
  } catch (err) {
    console.error("Error in 'me' route", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
