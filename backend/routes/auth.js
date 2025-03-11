import express from "express";

const router = express.Router();

router.post("/signin");
router.post("/signup");
router.post("/signout");
router.post("/verify-email");
router.get("/status");

export default router;
