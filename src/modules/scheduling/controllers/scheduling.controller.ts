import { schedulingDto } from "@/modules/scheduling/dtos/scheduling.dto";
import { createScheduling } from "@/modules/scheduling/services/scheduling.service";
import { authenticationMiddleware } from "@/shared/auth.middleware";
import { handleErrors } from "@/shared/error/error.handle";
import Router from "koa-router";

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
      const { message, status } = handleErrors(err);

      context.status = status;
      context.message = message;
    }
  }
);

export { schedulingRoutes };
