import mongoose from "mongoose";

export default async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB successfully running");
  } catch (err) {
    console.log("Error connecting to mongoDB:", err);
    process.exit(1);
  }
}
