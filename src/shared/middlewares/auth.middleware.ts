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
    return;
  }

  if (!authHeader) {
    throw new CustomError(ErrorMessages.UNAUTHORIZED);
  }

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const payload = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as jwt.JwtPayload;

        context.user = payload;
        await next();
        return;
      } catch (err) {
        throw new CustomError(ErrorMessages.UNAUTHORIZED);
      }
    }
    throw new CustomError(ErrorMessages.UNAUTHORIZED);
  }
  throw new CustomError(ErrorMessages.UNAUTHORIZED);
};
