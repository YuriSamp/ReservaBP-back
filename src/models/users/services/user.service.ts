import { ErrorMessages } from "@/utils/error/error..messages";
import bcrypt from "bcrypt";

import { signUpRequest } from "../dtos/signupdto.";
import { create } from "../repositories";

export const createUser = async (user: signUpRequest) => {
  user.password = await hashPassword(user.password);

  const newUser = await create(user);

  if (!newUser) {
    throw new Error(ErrorMessages.CANNOT_CREATE("User"));
  }

  return newUser;
};

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};
