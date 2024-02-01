import { getUserByEmail } from "@/models/users/services/user.service";
import { ErrorMessages } from "@/utils/error/error..messages";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context, Next } from "koa";

export type payload = {
  email: string;
  password: string;
};

const EXPIRE_DATE = "1d";

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

export const login = async (payload: payload) => {
  const user = await getUserByEmail(payload.email);

  const isValidPassword = await comparePasswords(
    payload.password,
    user.password
  );

  if (!isValidPassword) {
    throw new Error(ErrorMessages.INVALID_CREDENTIALS);
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: EXPIRE_DATE,
  });

  return token;
};

export const signUp = (payload: payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: EXPIRE_DATE,
  });

  return token;
};

const comparePasswords = async (password: string, hashedPassword: string) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  return isPasswordValid;
};
