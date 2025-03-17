import express from "express";
import {
  validateLogin,
  validateSignup,
  validateVerifyEmail,
} from "../middlewares/validateAuth.js";
import {
  login,
  logout,
  register,
  verifyEmail,
  getMe,
} from "../controllers/auth.js";
import passport from "../config/passport.js";
const router = express.Router();

router.post("/login", validateLogin, passport.authenticate("local"), login);
router.post("/register", validateSignup, register);
router.post("/logout", logout);
router.post("/verify-email", validateVerifyEmail, verifyEmail);
router.get("/me", getMe);

export default router;
