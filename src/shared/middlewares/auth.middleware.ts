import jwt from "jsonwebtoken";
import { Context, Next } from "koa";

import { CustomError } from "../error/custom-error";
import { ErrorMessages } from "../error/error.messages";

export const authenticationMiddleware = async (
  context: Context,
  next: Next
) => {
  const authHeader = context.req.headers.authorization;

  const publicRoutes = ["/signup", "/signin"];

  if (publicRoutes.includes(context.req.url as string)) {
    await next();
  }

  if (!authHeader) {
    throw new CustomError(ErrorMessages.UNAUTHORIZED);
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    throw new CustomError(ErrorMessages.UNAUTHORIZED);
  }

  const payload = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as jwt.JwtPayload;

  context.user = payload;
  await next();
};
