import mongoose from "mongoose";
import isEmail from "validator";
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validator: {
      validate: (value) => isEmail(value),
      message: "Email is not valid",
    },
  },
  password: { type: String, required: true },
});
const user = mongoose.model("User", userSchema);

export default user;
