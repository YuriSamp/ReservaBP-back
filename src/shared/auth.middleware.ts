import jwt from "jsonwebtoken";
import { Context, Next } from "koa";

import { ErrorMessages } from "./error/error.messages";

export const authenticationMiddleware = async (
  context: Context,
  next: Next
) => {
  const authHeader = context.req.headers.authorization;

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
        throw new Error(ErrorMessages.UNAUTHORIZED);
      }
    }
    throw new Error(ErrorMessages.UNAUTHORIZED);
  }

  const publicRoutes = ["/signin", "/signup"];

  if (publicRoutes.includes(context.request.URL.pathname)) {
    await next();
    return;
  }

  throw new Error(ErrorMessages.UNAUTHORIZED);
};
