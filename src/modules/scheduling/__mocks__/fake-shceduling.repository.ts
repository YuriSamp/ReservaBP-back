import { schedulingRequestDto } from "./../dtos/scheduling.dto";
import { fakeScheduling } from "./fake-scheduling";

export const fakeSchedulingRepository = {
  async createScheduleAppointment(scheduling: schedulingRequestDto) {
    return fakeScheduling;
  },
  async getscheduleAppointmentByDate(scheduling: schedulingRequestDto) {
    return false;
  },
};
