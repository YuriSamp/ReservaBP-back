import { Types } from "mongoose";

export type User = {
  _id: string | Types.ObjectId;
  role : string
  email: string;
  name: string;
  password: string;
  profilePicture: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
