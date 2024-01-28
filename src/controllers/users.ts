// this line solve this issue https://github.com/koajs/koa-body/issues/109
/// <reference path='../../node_modules/@types/koa-bodyparser/index.d.ts' />
import { Context } from "koa";
import * as z from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function signInUsers(context: Context) {
  const result = signInSchema.safeParse(context.request.body);

  if (!result.success) {
    context.body = {
      msg: "Opa amigo, tem algum dado errado",
      dados: context.request.body,
    };
    return;
  }

  context.body = context.request.body;
}

export async function signUpUsers(context: any) {
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

  context.body = "Uma request foi feita para a rota signup";
}
