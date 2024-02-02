import { getUserById } from "@/modules/users/services/user.service";
import { ErrorMessages } from "@/shared/error/error.messages";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type payload = {
  email: string;
  password: string;
};

const EXPIRE_DATE = "1d";

export const login = async (payload: payload) => {
  const user = await getUserById(payload.email);

  const isValidPassword = await comparePasswords(
    payload.password,
    user.password
  );

  if (!isValidPassword) {
    throw new Error(ErrorMessages.INVALID_CREDENTIALS);
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: EXPIRE_DATE,
  });

  return token;
};

export const signUp = (payload: payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: EXPIRE_DATE,
  });

  return token;
};

const comparePasswords = async (password: string, hashedPassword: string) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  return isPasswordValid;
};
