import { RequestUserDTO } from "../dtos/signup.dto";
import { fakeUser } from "./fake.user";

export const fakeServicecreateUser = async (user: RequestUserDTO) => {
  return Promise.resolve(fakeUser);
};

export const fakeServicegetUserByEmail = async (email: string) => {
  return Promise.resolve(fakeUser);
};

export const fakeServicegetUsers = async () => {
  return Promise.resolve(Array.from({ length: 10 }, () => fakeUser));
};

export const fakeServiceupdateUser = async (
  id: string,
  user: RequestUserDTO
) => {
  return Promise.resolve(fakeUser);
};

export const fakeServicedeleteUser = async (id: string) => {
  return Promise.resolve(fakeUser);
};
