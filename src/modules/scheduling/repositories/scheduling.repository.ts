import { schedulingModel } from "@/modules/scheduling/model/scheduling.model";

import { schedulingRequestDto } from "../dtos/scheduling.dto";

export const createScheduleAppointment = async (
  scheduling: schedulingRequestDto
) => {
  const newScheduling = await schedulingModel.create(scheduling);
  return newScheduling;
};

export const getscheduleAppointmentByDate = async (
  scheduling: schedulingRequestDto
) => {
  const existingMeeting = await schedulingModel.findOne({
    $or: [
      {
        $and: [
          { startTime: { $gte: scheduling.startTime } },
          { startTime: { $lt: scheduling.endTime } },
        ],
      },
      {
        $and: [
          { endTime: { $gt: scheduling.startTime } },
          { endTime: { $lte: scheduling.endTime } },
        ],
      },
      {
        $and: [
          { startTime: { $lte: scheduling.startTime } },
          { endTime: { $gte: scheduling.endTime } },
        ],
      },
    ],
  });

  return Boolean(existingMeeting);
};
