import { RequestUserDTO } from "../dtos/sign-up.dto";
import { fakeUser } from "./fake.user";

export const fakeUserService = {
  async createUser(user: RequestUserDTO): Promise<typeof fakeUser | null> {
    return Promise.resolve(fakeUser);
  },

  async getUserByEmail(email: string): Promise<typeof fakeUser | null> {
    return Promise.resolve(fakeUser);
  },

  async getAllUsers(): Promise<(typeof fakeUser)[] | null> {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeUser));
  },

  async updateUser(
    id: string,
    user: RequestUserDTO
  ): Promise<typeof fakeUser | null> {
    return Promise.resolve(fakeUser);
  },

  async deleteUser(id: string): Promise<typeof fakeUser | null> {
    return Promise.resolve(fakeUser);
  },
};
