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
    return res.status(200).json({ message: "Logout successful" });
  });
}
