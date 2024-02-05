import z from "zod";

const schedulingSchema = z.object({
  corretor: z
    .string({
      required_error: "Corretor não informado",
    })
    .email("Email Invalido"),
  cliente: z
    .string({
      required_error: "Campo cliente é obrigatorio",
    })
    .email("Email Invalido"),
  date: z.string({
    required_error: "Campo date é obrigatorio",
  }),
  startTime: z.string({
    required_error: "Campo Hora inicio é obrigatorio",
  }),
  endTime: z.string({
    required_error: "Campo Hora fim é obrigatorio",
  }),
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
