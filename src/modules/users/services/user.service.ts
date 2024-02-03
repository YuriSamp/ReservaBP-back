import { RequestUserDTO } from "@/modules/users/dtos/signup.dto";
import {
  create,
  getAllUsers,
  getByEmail,
  getById,
  permanentDelete,
  update,
} from "@/modules/users/repositories";
import { ErrorMessages } from "@/shared/error/error.messages";
import bcrypt from "bcrypt";

export const createUser = async (user: RequestUserDTO) => {
  const alreadyHasUser = await getByEmail(user.email);

  if (alreadyHasUser) {
    throw new Error(ErrorMessages.ALREADY_EXISTS);
  }

  user.password = await hashPassword(user.password);

  const newUser = await create(user);

  return newUser;
};


export const getUserByEmail = async (email: string) => {
  const user = await getByEmail(email);

  if (!user) {
    throw new Error(ErrorMessages.NOT_FOUND);
  }

  return user;
};

export const getUserById = async (id: string) => {
  const user = await getById(id);

  if (!user) {
    throw new Error(ErrorMessages.NOT_FOUND);
  }

  return user;
};

export const getUsers = async () => {
  const users = await getAllUsers();

  return users;
};

export const updateUser = async (id: string, user: RequestUserDTO) => {
  const isValidUser = await getUserById(id);

  if (!isValidUser) throw new Error(ErrorMessages.NOT_FOUND);

  user.password = await hashPassword(user.password);
  const updatedUser = await update(id, user);

  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const isValidUser = await getUserById(id);

  if (!isValidUser) throw new Error(ErrorMessages.NOT_FOUND);

  const deletedUser = await permanentDelete(id);

  return deletedUser;
};

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};
