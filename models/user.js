import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator"; //plugin which adds pre-save validation for unique fields

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      index: true,
      lowercase: true,
      unique: true,
      trim: true,
      minLength: 5,
      maxLength: 30,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
    },
    resetCode: {
      data: String,
      expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000),
      },
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
