import { authenticationMiddleware } from "@/models/auth/services/auth";
import { errorHandler } from "@/utils/error/error.handle";
import Router from "koa-router";
import { ZodError } from "zod";

import { schedulingDto } from "../dtos";

const schedulingRoutes = new Router();

schedulingRoutes.post("/scheduling", authenticationMiddleware, (context) => {
  const { data } = context.request.body as { data: unknown };
  try {
    schedulingDto(data);

    context.status = 200;
    context.body = "Deu tudo certo chefia";
  } catch (err) {
    if (err instanceof ZodError) {
      context.status = 400;
      context.message = err.errors.at(0)?.message as string;
      return;
    }
    if (err instanceof Error) {
      const { message, status } =
        errorHandler[err.message as keyof typeof errorHandler];
      context.status = status;
      context.message = message;
    }
  }
});

export { schedulingRoutes };
