import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    role: { type: String, require: true },
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const userModel = model("User", userSchema);
