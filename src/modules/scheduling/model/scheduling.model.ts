import { model, Schema } from "mongoose";

const schedulingSchema = new Schema(
  {
    corretor: { type: String, required: true },
    cliente: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, unique: true, required: true },
    endTime: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const schedulingModel = model("Scheduling", schedulingSchema);
