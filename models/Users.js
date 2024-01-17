import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";

export const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptionList,
    default: "starter",
  },
  token: String,
  avatarURL: {
    type: String,
    requred: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    //required: [true, "Verify token is required"],
  },
});

userSchema.post("save", handleSaveError); //операція save у методі, яка викличе хук після невдалого збереження

const User = model("user", userSchema);

export default User;
