import { describe, expect, test } from "@jest/globals";

import { fakeScheduling } from "../../__mocks__/fake-scheduling";
import { fakeSchedulingRepository } from "../../__mocks__/fake-shceduling.repository";

describe("Scheduling repository", () => {
  test("should create a schedule", async () => {
    const scheduling =
      await fakeSchedulingRepository.createScheduleAppointment(fakeScheduling);

    expect(scheduling).toEqual(fakeScheduling);
  });

  test("should check if the database already has a schedling in the time", async () => {
    const hasScheduling =
      await fakeSchedulingRepository.getscheduleAppointmentByDate(
        fakeScheduling
      );

    expect(hasScheduling).toBeFalsy();
  });
});
