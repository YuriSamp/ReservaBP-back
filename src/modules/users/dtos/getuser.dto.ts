import { User } from "../model/user.type";

export const getUserReponseDto = (users: User[]) => {
  if (!users.length) return users;

  const userData = users.map((user) => ({
    id: JSON.stringify(user._id),
    role: user.role,
    email: user.email,
    profilePicture: user.profilePicture,
  }));

  return userData;
};
