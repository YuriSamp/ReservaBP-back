import { RequestUserDTO } from "@/modules/users/dtos/sign-up.dto";
import { userModel } from "@/modules/users/model/user.mongoose.model";

export const getById = async (id: string) => {
  const user = await userModel.findOne({ _id: id });

  return user;
};

export const getByEmail = async (email: string) => {
  const user = await userModel.findOne({ email: email });

  return user;
};

export const getAllUsers = async () => {
  const users = await userModel.find({});
  return users;
};

export const create = async (user: RequestUserDTO) => {
  const newUser = await userModel.create(user);
  return newUser;
};

export const update = async (id: string, user: RequestUserDTO) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, user, {
    new: true,
  });

  return updatedUser;
};

export const permanentDelete = async (id: string) => {
  const deletedUser = await userModel.findByIdAndDelete({ _id: id });

  return deletedUser;
};
