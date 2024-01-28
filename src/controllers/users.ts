import { Context, Next } from "koa";

export async function signInUsers(context: Context) {
  context.body = "Uma request foi feita para a rota signin";
}

export async function signUpUsers(context: any) {
  context.body = "Uma request foi feita para a rota signup";
}
