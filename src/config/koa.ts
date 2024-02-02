import { schedulingRoutes } from "@/modules/scheduling/controllers";
import { userRoutes } from "@/modules/users/controllers";
import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

app.use(bodyParser()).use(cors()).use(router.routes());

const nestedRoutes = [userRoutes, schedulingRoutes];

for (const routes of nestedRoutes) {
  router.use(routes.routes(), router.allowedMethods());
}

export { app };
