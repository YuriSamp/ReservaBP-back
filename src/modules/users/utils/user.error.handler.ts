import { errorHandler } from "@/shared/error/error.handle";
import { ZodError } from "zod";

export const handleUserErrors = (err: unknown) => {
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
      errorHandler[err.message as keyof typeof errorHandler];
    return { message, status };
  }

  const status = 500;
  const message = "Erro desconhecido";

  return { status, message };
};
