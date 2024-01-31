import { signUpRequest } from "../dtos/signup.dto";
import { userModel } from "../model/user.mongosse.model";

export const getByEmail = async (email: string) => {
  const user = await userModel.findOne({ email: email });

  return user;
};

export const getAllConsultants = () => {};

export const create = async (user: signUpRequest) => {
  const newUser = await userModel.create(user);
  const reponse = {
    password: newUser.password,
    email: newUser.email,
  };
  return reponse;
};

export const update = () => {};

export const softDelete = () => {};
