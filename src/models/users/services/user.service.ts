import { signUpRequest } from "@/models/users/dtos/signup.dto";
import { create, getByEmail } from "@/models/users/repositories";
import { ErrorMessages } from "@/utils/error/error..messages";
import bcrypt from "bcrypt";

export const createUser = async (user: signUpRequest) => {
  user.password = await hashPassword(user.password);

  const newUser = await create(user);

  if (!newUser) {
    throw new Error(ErrorMessages.CANNOT_CREATE("User"));
  }

  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const user = await getByEmail(email);

  if (!user) {
    throw new Error(ErrorMessages.NOT_FOUND(`User with email ${email}`));
  }

  return user;
};

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};
