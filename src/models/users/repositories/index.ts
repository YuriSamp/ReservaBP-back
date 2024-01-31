import { signUpRequest } from "../dtos/signupdto.";
import { UserModel } from "../model/user.mongosse.model";

export const getByEmail = (email: string) => {};

export const getAllConsultants = () => {};

export const create = async (user: signUpRequest) => {
  const newUser = await UserModel.create(user);
  const reponse = {
    password: newUser.password,
    email: newUser.email,
  };
  return reponse;
};

export const update = () => {};

export const softDelete = () => {};
