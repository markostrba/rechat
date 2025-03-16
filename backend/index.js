import express from "express";
import session from "express-session";
import "dotenv/config";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("combined"));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 15,
    },
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
