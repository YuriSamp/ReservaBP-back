import { swagger } from "@/config/swagger";
import { schedulingRoutes } from "@/modules/scheduling/controllers/scheduling.controller";
import { userRoutes } from "@/modules/users/controllers";
import { authenticationMiddleware } from "@/shared/middlewares/auth.middleware";
import { errorMiddleware } from "@/shared/middlewares/error.middleware";
import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

app
  .use(bodyParser())
  .use(cors())
  .use(swagger)
  .use(errorMiddleware)
  .use(authenticationMiddleware)
  .use(router.routes());

const nestedRoutes = [userRoutes, schedulingRoutes];

for (const routes of nestedRoutes) {
  router.use(routes.routes(), router.allowedMethods());
}

export { app };
