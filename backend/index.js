import express from "express";
import helmet from "helmet";
import "dotenv/config";
import cors from "cors";
import session from "express-session";
import ExpressMongoSanitize from "express-mongo-sanitize";

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(ExpressMongoSanitize());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
