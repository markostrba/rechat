import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const customFields = { usernameField: "email", passwordField: "password" };

passport.use(
  new LocalStrategy(customFields, async function verify(email, password, done) {
    try {
      const foundUser = await User.findOne({ email });

      if (!foundUser)
        return done(null, false, {
          message: "Incorrect username or password.",
        });

      const isPasswordValid = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!isPasswordValid)
        return done(null, false, {
          message: "Incorrect username or password.",
        });

      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  })
);

passport.serializeUser(async (user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId).select("-password");
    return done(null, user);
  } catch (err) {
    console.error(err);
    done(err);
  }
});

export default passport;
