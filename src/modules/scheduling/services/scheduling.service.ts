import {
  createScheduleAppointment,
  getscheduleAppointmentByDate,
} from "@/modules/scheduling/repositories";

import { shchedulingRequestDto } from "../dtos/scheduling.dto";

export const createScheduling = async (scheduling: shchedulingRequestDto) => {
  const isAvailable = await checkAvailability(scheduling);

  if (!isAvailable) {
    throw new Error("AQUI ENTRA UMA MENSAGEM");
  }
  const _scheduling = await createScheduleAppointment(scheduling);
  return _scheduling;
};

const checkAvailability = async (scheduling: shchedulingRequestDto) => {
  const _scheduling = await getscheduleAppointmentByDate(scheduling);

  console.log({ _scheduling });

  return !_scheduling;
};
