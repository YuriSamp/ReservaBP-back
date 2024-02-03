import { schedulingDto } from "@/modules/scheduling/dtos/scheduling.dto";
import { createScheduling } from "@/modules/scheduling/services/scheduling.service";
import Router from "koa-router";

const schedulingRoutes = new Router();

schedulingRoutes.post("/scheduling", async (context) => {
  const schedule = schedulingDto(context.request.body);
  await createScheduling(schedule);

  context.status = 200;
  context.body = "Agendamento criado com sucesso";
});

export { schedulingRoutes };
