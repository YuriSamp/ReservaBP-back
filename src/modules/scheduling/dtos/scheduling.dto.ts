import z from "zod";

const schedulingSchema = z.object({
  corretor: z.string().email("Email Invalido"),
  cliente: z.string().email("Email Invalido"),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export type schedulingRequestDto = {
  corretor: string;
  cliente: string;
  date: Date;
  startTime: Date;
  endTime: Date;
};

export const schedulingDto = (schedulingData: unknown) => {
  const validaterScheduling = schedulingSchema.parse(schedulingData);

  const { cliente, corretor, date, endTime, startTime } = validaterScheduling;

  const data = {
    cliente,
    corretor,
    date: new Date(date),
    endTime: new Date(endTime),
    startTime: new Date(startTime),
  };

  return data;
};
