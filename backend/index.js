import express from "express";
import helmet from "helmet";
import "dotenv/config";
import cors from "cors";
import session from "express-session";
import ExpressMongoSanitize from "express-mongo-sanitize";
import connectDb from "./config/connectDb.js";
import authRouter from "./routes/auth.js";

const port = process.env.PORT || 5000;
const app = express();
connectDb();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(ExpressMongoSanitize());

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
