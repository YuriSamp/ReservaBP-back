import { User } from "../model/user.type";

export const getCredentials = (user: User) => {
  const userCredentials = {
    password: user.password,
    email: user.email,
  };
  return userCredentials;
};
