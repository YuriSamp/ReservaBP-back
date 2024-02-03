import {
  createScheduleAppointment,
  getscheduleAppointmentByDate,
} from "@/modules/scheduling/repositories/scheduling.repository";
import { getByEmail } from "@/modules/users/repositories";
import { CustomError } from "@/shared/error/custom.error";
import { ErrorMessages } from "@/shared/error/error.messages";
import { differenceInMinutes } from "date-fns";

import { schedulingRequestDto } from "../dtos/scheduling.dto";

export const createScheduling = async (scheduling: schedulingRequestDto) => {
  await checkCredetials(scheduling);
  await checkAvailability(scheduling);
  checkTime(scheduling.startTime, scheduling.endTime);

  const createdScheduling = await createScheduleAppointment(scheduling);

  return createdScheduling;
};

const checkAvailability = async (scheduling: schedulingRequestDto) => {
  const hasScheduling = await getscheduleAppointmentByDate(scheduling);

  if (hasScheduling) {
    throw new CustomError(ErrorMessages.TIME_NOT_AVAILABLE);
  }
};

const checkTime = (startTime: Date, endTime: Date) => {
  const difference = differenceInMinutes(endTime, startTime);

  if (difference < 0) throw new CustomError(ErrorMessages.TIME_LESS_THAN_ZERO);

  if (difference < 30)
    throw new CustomError(ErrorMessages.TIME_LESS_THAN_30_MINUTES);

  if (difference > 120) {
    throw new CustomError(ErrorMessages.TIME_GREATER_THAN_2_HOURS);
  }
};

const checkCredetials = async (scheduling: schedulingRequestDto) => {
  const client = await getByEmail(scheduling.cliente);

  if (!client || client?.role !== "Cliente") {
    throw new CustomError(ErrorMessages.CLIENT_NOT_FOUND);
  }

  const consultor = await getByEmail(scheduling.corretor);

  if (!consultor || consultor?.role !== "Corretor de seguro") {
    throw new CustomError(ErrorMessages.CONSULTOR_NOT_FOUND);
  }
};
