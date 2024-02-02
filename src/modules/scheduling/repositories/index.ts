import { schedulingModel } from "@/modules/scheduling/model/scheduling.model";

import { shchedulingRequestDto } from "../dtos";

export const createScheduleAppointment = async (
  scheduling: shchedulingRequestDto
) => {
  const newScheduling = await schedulingModel.create(scheduling);
  return newScheduling;
};

export const getscheduleAppointmentByDate = async (
  scheduling: shchedulingRequestDto
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

  return existingMeeting;
};
