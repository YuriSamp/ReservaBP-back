import { schedulingDto } from "@/modules/scheduling/dtos/scheduling.dto";
import { createScheduling } from "@/modules/scheduling/services/scheduling.service";
import { authenticationMiddleware } from "@/shared/auth.middleware";
import { errorHandler } from "@/shared/error/error.handle";
import Router from "koa-router";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

const schedulingRoutes = new Router();

schedulingRoutes.post(
  "/scheduling",
  authenticationMiddleware,
  async (context) => {
    try {
      const schedule = schedulingDto(context.request.body);
      await createScheduling(schedule);

      context.status = 200;
      context.body = "Agendamento criado com sucesso";
    } catch (err) {
      console.log(err);
      if (err instanceof MongooseError) {
        console.log(err);
      }
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
  }
);

export { schedulingRoutes };
