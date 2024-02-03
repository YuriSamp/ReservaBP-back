import { RESPONSE_STATUS_CODES } from "@/shared/error/response.status";
import { ZodError } from "zod";

export const handleErrors = (err: unknown) => {
  if (err instanceof SyntaxError) {
    const status = 400;
    const message = "Por favor mande um json valido";
    return { status, message };
  }
  if (err instanceof ZodError) {
    const status = 400;
    const message = err.errors.at(0)?.message as string;
    return { status, message };
  }
  if (err instanceof Error) {
    const { message, status } =
      RESPONSE_STATUS_CODES[err.message as keyof typeof RESPONSE_STATUS_CODES];
    return { message, status };
  }

  const status = 500;
  const message = "Erro desconhecido";

  return { status, message };
};
