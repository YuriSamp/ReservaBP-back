import { RESPONSE_STATUS_CODES } from "@/shared/error/response.status";
import jwt from "jsonwebtoken";
import { Context, Next } from "koa";

export const authenticationMiddleware = async (
  context: Context,
  next: Next
) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader) {
    throwUnauthorizedError(context);
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
        throwUnauthorizedError(context);
      }
    }
    throwUnauthorizedError(context);
  }
  throwUnauthorizedError(context);
};

//Koa doesn't call next if we throw an error, so we need to return the staus code here
const throwUnauthorizedError = (context: any) => {
  const { message, status } = RESPONSE_STATUS_CODES.UNAUTHORIZED;
  context.status = status;
  context.message = message;
};
