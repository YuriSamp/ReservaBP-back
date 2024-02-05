import { Context, Next } from "koa";

import { errorsHandler } from "../error/error.handler";

export const errorMiddleware = async (context: Context, next: Next) => {
  try {
    await next();
    return;
  } catch (err) {
    console.log({ err });
    const { message, status } = errorsHandler(err);
    context.status = status;
    context.message = message;
  }
};
