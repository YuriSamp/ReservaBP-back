import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";

import "dotenv/config";

import { apiRoutes } from "./routes/routes";

const app = new Koa();
const router = new Router();

apiRoutes.forEach((route) => router[route.method](route.path, route.action));

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8000);
