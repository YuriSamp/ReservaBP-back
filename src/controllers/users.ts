// this line solve this issue https://github.com/koajs/koa-body/issues/109
/// <reference path='../../node_modules/@types/koa-bodyparser/index.d.ts' />
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context } from "koa";
import * as z from "zod";

const JWT_KEY = process.env.JWT_KEY || "";
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
    // const hash = "aqui entra a requisição pro banco";
    // const isTheSamePassword = await bcrypt.compare(result.data.password, hash);
  } catch (error) {}

  const jwtKey = jwt.sign(
    {
      data: "foobar",
    },
    JWT_KEY,
    { expiresIn: "1h" }
  );

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

  // const salt = await bcrypt.genSalt(saltRounds);
  // const hash = await bcrypt.hash(result.data.password, salt);

  context.body = "Uma request foi feita para a rota signup";
}
