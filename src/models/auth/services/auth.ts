import jwt from "jsonwebtoken";
import { Context, Next } from "koa";

import { ErrorMessages } from "../../../utils/errorhandle/error..message";

export const authenticationMiddleware = (context: Context, next: Next) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const payload = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as jwt.JwtPayload;

        context.userId = payload.id;
        next();
      } catch (err) {
        console.log(err);
        throw new Error(ErrorMessages.UNAUTHORIZED);
      }
    }
    throw new Error(ErrorMessages.UNAUTHORIZED);
  }

  const publicRoutes = ["/signin", "/signup"];

  if (publicRoutes.includes(context.request.URL.pathname)) {
    return true;
  }

  throw new Error(ErrorMessages.UNAUTHORIZED);
};
