import express from "express";
import helmet from "helmet";
import "dotenv/config";
import cors from "cors";
import session from "express-session";
import ExpressMongoSanitize from "express-mongo-sanitize";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import connectDb from "./config/connectDb.js";
import authRouter from "./routes/auth.js";
import passport from "./config/passport.js";
const port = process.env.PORT || 5000;
const app = express();
connectDb();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
    cookie: {
      secure: process.env.NODE_ENV === "PRODUCTION",
      httpOnly: true,
      maxAge: Date.now() + 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
