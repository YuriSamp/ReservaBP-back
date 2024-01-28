// this line solve this issue https://github.com/koajs/koa-body/issues/109
/// <reference path='../../node_modules/@types/koa-bodyparser/index.d.ts' />
import bcrypt from "bcrypt";
import { Context } from "koa";
import * as z from "zod";

import { createJWT } from "../services/createJWT";
import { hashPassword } from "../services/hashPassword";

const saltRounds = 12;

const signInSchema = z.object({
  email: z.string().email("Invalid mail"),
  password: z.string().min(8, "Password length lower than 8 digits"),
});

const signUpSchema = z
  .object({
    email: z.string().email("Invalid mail"),
    password: z.string().min(8, "Password length lower than 8 digits"),
    confirmPassword: z.string().min(8),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function signInUsers(context: Context) {
  const result = signInSchema.safeParse(context.request.body);

  if (!result.success) {
    context.status = 401;
    context.body = {
      mensage: result.error.issues.at(0)?.message,
    };
    return;
  }

  try {
    const hash = hashPassword(result.data.password);
  } catch (error) {}

  const jwtKey = createJWT(result.data);

  context.status = 200;
  context.body = jwtKey;
}

export async function signUpUsers(context: Context) {
  const result = signUpSchema.safeParse(context.request.body);

  if (!result.success) {
    context.body = {
      msg: "Opa amigo, tem algum dado errado",
      erros: result.error.issues.map((issues) => ({
        mensage: issues.message,
        path: issues.path.at(0),
      })),
    };
    return;
  }

  try {
    const hash = hashPassword(result.data.password);
  } catch (error) {}

  const jwtKey = createJWT(result.data);

  context.status = 200;
  context.body = jwtKey;
}
