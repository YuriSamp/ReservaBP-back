import { describe, expect, test } from "@jest/globals";

import { fakeRequestUser } from "../../__mocks__/fake-request.user";
import { fakeUser } from "../../__mocks__/fake.user";
import { fakeUserService } from "../../__mocks__/fake.user.service";

describe("User service", () => {
  test("should create user", async () => {
    const user = await fakeUserService.createUser(fakeRequestUser);

    expect(user).toEqual(fakeUser);
  });

  test("should update user", async () => {
    const user = await fakeUserService.updateUser(
      fakeUser._id,
      fakeRequestUser
    );

    expect(user).toEqual(fakeUser);
  });

  test("should delete user", async () => {
    const user = await fakeUserService.deleteUser(fakeUser._id);

    expect(user).toEqual(fakeUser);
  });

  test("should get user by email", async () => {
    const user = await fakeUserService.getUserByEmail(fakeRequestUser.email);

    expect(user).toEqual(fakeUser);
  });

  test("should get all users", async () => {
    const users = await fakeUserService.getAllUsers();

    expect(users).toEqual(Array.from({ length: 10 }, () => fakeUser));
  });
});
