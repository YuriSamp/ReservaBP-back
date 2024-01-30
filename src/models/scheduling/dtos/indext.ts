import * as z from "zod";

const schedulingSchema = z.object({
  consultor: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const schedulingDto = (schedulingData: unknown) => {
  const validaterScheduling = schedulingSchema.safeParse(schedulingData);

  if (!validaterScheduling.success) {
    throw new Error(`Invalid scheduling data: ${validaterScheduling.error} `);
  }

  return validaterScheduling.data;
};
