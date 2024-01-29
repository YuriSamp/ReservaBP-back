import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";

import { apiRoutes } from "../routes";

const app = new Koa();
const router = new Router();

app.use(bodyParser()).use(cors()).use(router.routes());

apiRoutes.forEach((route) => router[route.method](route.path, route.action));

export { app };
