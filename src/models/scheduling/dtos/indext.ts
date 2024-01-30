import * as z from "zod";

const schedulingSchema = z.object({
  consultor: z.string().min(3),
  date: z.string().min(3),
  startTime: z.string().length(4),
  endTime: z.string().length(4),
});

export const schedulingDto = (schedulingData: unknown) => {
  const validaterScheduling = schedulingSchema.safeParse(schedulingData);

  if (!validaterScheduling.success) {
    throw new Error(`Invalid scheduling data: ${validaterScheduling.error} `);
  }

  return validaterScheduling.data;
};
