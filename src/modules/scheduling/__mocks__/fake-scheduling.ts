import { faker } from "@faker-js/faker";

import { fakeMongoObjectId } from "../../../__mocks__/fake.mongo.id";

const generateFakeScheduling = () => ({
  _id: fakeMongoObjectId,
  corretor: "yurisamp123@gmail.com",
  cliente: "Joao123@gmail.com",
  date: faker.date.soon(),
  startTime: faker.date.soon(),
  endTime: faker.date.soon(),
});

export const fakeScheduling = generateFakeScheduling();
