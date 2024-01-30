import { authenticationMiddleware } from "@/models/auth/services/auth";
import Router from "koa-router";

import { schedulingDto } from "../dtos/indext";

const schedulingRoutes = new Router();

schedulingRoutes.post("/scheduling", authenticationMiddleware, (context) => {
  schedulingDto(context.request.body);

  context.status = 200;
  context.body = "Deu tudo certo chefia";
});
