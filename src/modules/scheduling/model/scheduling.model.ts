import { model, Schema } from "mongoose";

const schedulingSchema = new Schema(
  {
    agent: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, unique: true, required: true },
    endTime: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const schedulingModel = model("User", schedulingSchema);
