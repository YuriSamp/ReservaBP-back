import { schedulingRequestDto } from "./../dtos/scheduling.dto";
import { fakeScheduling } from "./fake-scheduling";

export const fakeSchedulingService = {
  async createScheduling(scheduling: schedulingRequestDto) {
    return fakeScheduling;
  },
};
