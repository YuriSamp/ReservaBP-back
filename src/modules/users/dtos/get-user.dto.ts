import { User } from "../model/user.type";

export const getUserReponseDto = (users: User[] | User) => {
  if (!Array.isArray(users)) {
    const user = {
      id: users._id,
      role: users.role,
      email: users.email,
      profilePicture: users.profilePicture,
      name: users.name,
    };
    return user;
  }

  const userData = users.map((user) => ({
    id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
  }));

  return userData;
};
