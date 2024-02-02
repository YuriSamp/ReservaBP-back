import { faker } from "@faker-js/faker";

import { fakeMongoObjectId } from "../../../__mocks__/fake.mongo.id";

export const generateFakeUser = () => ({
  _id: fakeMongoObjectId,
  role: "Cliente",
  name: `${faker.person.prefix()} ${faker.person.lastName()}`,
  email: faker.internet.email(),
  profilePicture: faker.internet.url,
  password: faker.internet.password(),
  deletedAt: String(faker.date.past()),
  createdAt: String(faker.date.past()),
  updatedAt: String(faker.date.past()),
});

export const fakeUser = generateFakeUser();
