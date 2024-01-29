import jwt from "jsonwebtoken";
import { Context, Next } from "koa";

const authenticateToken = async (ctx: Context, next: Next) => {
  const tokenFull = ctx.header.authorization;
  const token = tokenFull?.split(" ").at(1);

  if (!token) {
    ctx.status = 401;
    ctx.body = { message: "Token não fornecido" };
    return;
  }

  try {
    const user = jwt.verify(token, "seuSegredoJWT");
    ctx.state.user = user;
    await next();
  } catch (err) {
    ctx.status = 403;
    ctx.body = { message: "Token inválido" };
  }
};
