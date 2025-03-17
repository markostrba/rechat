import express from "express";
import session from "express-session";
import "dotenv/config";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import connectDb from "./src/config/db.js";
import passport from "./src/config/passport.js";
import authRouter from "./src/routes/auth.js";
import { xss } from "express-xss-sanitizer";
const app = express();
const port = process.env.PORT || 5000;

connectDb();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(xss());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
    cookie: {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 15,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
