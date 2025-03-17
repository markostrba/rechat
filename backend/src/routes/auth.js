import express from "express";
import { validateLogin, validateSignup } from "../middlewares/validateAuth.js";
import { login, register } from "../controllers/auth.js";
import passport from "../config/passport.js";
const router = express.Router();

router.post("/login", validateLogin, passport.authenticate("local"), login);
router.post("/register", validateSignup, register);
router.post("/logout");

export default router;
