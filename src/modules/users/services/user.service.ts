import { RequestUserDTO } from "@/modules/users/dtos/sign-up.dto";
import {
  create,
  getAllUsers,
  getByEmail,
  getById,
  permanentDelete,
  update,
} from "@/modules/users/repositories";
import { CustomError } from "@/shared/error/custom-error";
import { ErrorMessages } from "@/shared/error/error.messages";
import bcrypt from "bcrypt";

export const createUser = async (user: RequestUserDTO) => {
  const alreadyHasUser = await getByEmail(user.email);

  if (alreadyHasUser) {
    throw new CustomError(ErrorMessages.ALREADY_EXISTS);
  }

  user.password = await hashPassword(user.password);

  const newUser = await create(user);

  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const user = await getByEmail(email);

  if (!user) {
    throw new CustomError(ErrorMessages.USER_NOT_FOUND);
  }

  return user;
};

export const getUserById = async (id: string) => {
  const user = await getById(id);

  if (!user) {
    throw new CustomError(ErrorMessages.USER_NOT_FOUND);
  }

  return user;
};

export const getUsers = async () => {
  const users = await getAllUsers();

  return users;
};

export const updateUser = async (id: string, user: RequestUserDTO) => {
  await getUserById(id);

  user.password = await hashPassword(user.password);
  const updatedUser = await update(id, user);

  return updatedUser;
};

export const deleteUser = async (id: string) => {
  await getUserById(id);
  await permanentDelete(id);
};

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};
