import { describe, expect, test } from "@jest/globals";

import { fakeRequestUser } from "../../__mocks__/fake-request.user";
import {
  fakeRepositoryCreate,
  fakeRepositoryGetAllUsers,
  fakeRepositoryGetByEmail,
  fakeRepositoryGetById,
  fakeRepositoryPermanentDelete,
  fakeRepositoryUpdate,
} from "../../__mocks__/fake-user.repository";
import { fakeUser } from "../../__mocks__/fake.user";
import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.id";

describe("User Repository", () => {
  test("should return all users", async () => {
    const users = await fakeRepositoryGetAllUsers();

    expect(users).toEqual(Array.from({ length: 10 }, () => fakeUser));
  });

  test("should return a user by email", async () => {
    const user = await fakeRepositoryGetByEmail("email de teste");

    expect(user).toEqual(fakeUser);
  });

  test("should return a user by id", async () => {
    const user = await fakeRepositoryGetById(fakeMongoObjectId);

    expect(user).toEqual(fakeUser);
  });

  test("should create and return a user", async () => {
    const user = await fakeRepositoryCreate(fakeRequestUser);

    expect(user).toEqual(fakeUser);
  });

  test("should update and return a user", async () => {
    const user = await fakeRepositoryUpdate(fakeMongoObjectId, fakeRequestUser);

    expect(user).toEqual(fakeUser);
  });

  test("should delete and return a user", async () => {
    const user = await fakeRepositoryPermanentDelete(fakeMongoObjectId);

    expect(user).toEqual(fakeUser);
  });
});
