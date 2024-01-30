import { authenticationMiddleware } from "@/models/auth/services/auth";
import Router from "koa-router";

import { schedulingDto } from "../dtos/indext";

const schedulingRoutes = new Router();

schedulingRoutes.post("/scheduling", authenticationMiddleware, (context) => {
  const { data } = context.request.body as { data: unknown };
  try {
    schedulingDto(data);

    context.status = 200;
    context.body = "Deu tudo certo chefia";
  } catch (error) {}
});

export { schedulingRoutes };
