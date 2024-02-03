import { describe, expect, test } from "@jest/globals";

import { fakeScheduling } from "../../__mocks__/fake-scheduling";
import { fakeSchedulingService } from "../../__mocks__/fake-scheduling.service";

describe("Scheduling service", () => {
  test("should create a schedule", async () => {
    const scheduling =
      await fakeSchedulingService.createScheduling(fakeScheduling);

    expect(scheduling).toEqual(fakeScheduling);
  });
});
