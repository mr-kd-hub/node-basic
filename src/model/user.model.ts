import mongoose, { Schema } from "mongoose";
import * as bcrypt from "bcrypt";
import { encryptPassword } from "../utils/helper";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  const user = this; //current document
  const password = user.password;
  const hashedPassword = await encryptPassword(password);
  user.password = hashedPassword;
  next();
});
export default mongoose.model("User", userSchema);
