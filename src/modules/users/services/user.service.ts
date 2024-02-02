import { RequestUserDTO } from "@/modules/users/dtos/signup.dto";
import {
  create,
  getAllUsers,
  getByEmail,
  permanentDelete,
  update,
} from "@/modules/users/repositories";
import { ErrorMessages } from "@/shared/error/error.messages";
import bcrypt from "bcrypt";

export const createUser = async (user: RequestUserDTO) => {
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

export const getUsers = async () => {
  const users = await getAllUsers();

  if (!users) {
    //Melhorar depois
    throw new Error("CANNOT FIND ANY USER");
  }

  return users;
};

export const updateUser = async (id: string, user: RequestUserDTO) => {
  user.password = await hashPassword(user.password);
  const updatedUser = await update(id, user);

  if (!updatedUser) {
    throw new Error(ErrorMessages.CANNOT_UPDATE(`User with id ${id}`));
  }

  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const deletedUser = await permanentDelete(id);

  if (!deletedUser) {
    throw new Error(ErrorMessages.CANNOT_DELETE(`User with email ${id}`));
  }

  return deletedUser;
};

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};
