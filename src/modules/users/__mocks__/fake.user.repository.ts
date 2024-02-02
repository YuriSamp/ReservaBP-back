import { RequestUserDTO } from "../dtos/signup.dto";
import { fakeUser } from "./fake.user";

export const fakeRepositoryGetAllUsers = async () => {
  return Promise.resolve(Array.from({ length: 10 }, () => fakeUser));
};

export const fakeRepositoryGetByEmail = async (email: string) => {
  return Promise.resolve(fakeUser);
};

export const fakeRepositoryGetById = async (id: string) => {
  return Promise.resolve(fakeUser);
};

export const fakeRepositoryCreate = async (user: RequestUserDTO) => {
  return Promise.resolve(fakeUser);
};

export const fakeRepositoryUpdate = async (d: string, user: RequestUserDTO) => {
  return Promise.resolve(fakeUser);
};

export const fakeRepositoryPermanentDelete = async (id: string) => {
  return Promise.resolve(fakeUser);
};
