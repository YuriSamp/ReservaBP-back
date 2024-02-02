import { fakeUser } from "./fake.user";

export const fakeRepositoryCreateUser = async () => {
  return Promise.resolve(fakeUser);
};

export const fakeRepositoryGetAllUsers = async () => {
  return Promise.resolve(Array.from({ length: 10 }, () => fakeUser));
};

export const fakeRepositoryGetByEmail = async () => {
  return Promise.resolve(fakeUser);
};

export const fakeRepositoryCreate = async () => {
  return Promise.resolve(fakeUser);
};

export const fakeRepositoryUpdate = async () => {
  return Promise.resolve(fakeUser);
};

export const fakeRepositoryPermanentDelete = async () => {
  return Promise.resolve(fakeUser);
};
