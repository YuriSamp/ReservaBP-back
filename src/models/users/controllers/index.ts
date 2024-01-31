import { authenticationMiddleware, login } from "@/models/auth/services/auth";
import { signInDto } from "@/models/users/dtos/signin.dto";
import { signUpDto } from "@/models/users/dtos/signupdto.";
import { errorHandler } from "@/utils/error/error.handle";
import Router from "koa-router";
import { ZodError } from "zod";

import { createUser } from "../services/user.service";

const userRoutes = new Router();

userRoutes.post("/signin", async (context) => {
  try {
    const userData = signInDto(context.request.body);
    const token = await login(userData);

    context.status = 200;
    context.body = token;
  } catch (err) {
    if (err instanceof ZodError) {
      context.status = 400;
      context.message = err.errors.at(0)?.message as string;
      return;
    }
    if (err instanceof Error) {
      const { message, status } =
        errorHandler[err.message as keyof typeof errorHandler];
      context.status = status;
      context.message = message;
    }
  }
});

userRoutes.post("/signup", authenticationMiddleware, async (context) => {
  try {
    const userData = signUpDto(context.request.body);
    const userFromDb = await createUser(userData);
    const token = await login(userFromDb);
    context.status = 200;
    context.body = token;
  } catch (err) {
    if (err instanceof Error) {
      const { message, status } =
        errorHandler[err.message as keyof typeof errorHandler];
      context.status = status;
      context.message = message;
    }
  }
});

userRoutes.get("/users", authenticationMiddleware, async (context) => {
  try {
    const arrayDeObjetos = [
      { id: 1, name: "Objeto 1" },
      { id: 2, name: "Objeto 2" },
      { id: 3, name: "Objeto 3" },
      { id: 4, name: "Objeto 4" },
      { id: 5, name: "Objeto 5" },
    ];

    context.status = 200;
    context.body = arrayDeObjetos;
  } catch (err) {
    if (err instanceof Error) {
      const { message, status } =
        errorHandler[err.message as keyof typeof errorHandler];
      context.status = status;
      context.message = message;
    }
  }
});

userRoutes.get("/user/me", authenticationMiddleware, async (context) => {
  try {
    const user = {
      email: "teste123@gmail.com",
      name: "Yuri",
      profilePicture: "https://github.com/samsantosb.png",
      role: "Consultor",
    };

    context.status = 200;
    context.body = user;
  } catch (err) {
    if (err instanceof Error) {
      const { message, status } =
        errorHandler[err.message as keyof typeof errorHandler];
      context.status = status;
      context.message = message;
    }
  }
});

userRoutes.put("/user/:id", authenticationMiddleware, async (context) => {
  try {
    const userId = context.params.id;
    const user = {
      id: 1,
      email: "teste123@gmail.com",
      name: "Yuri",
      profilePicture: "https://github.com/samsantosb.png",
      role: "Consultor",
    };

    context.status = 200;
    context.body = user;
  } catch (err) {
    if (err instanceof Error) {
      const { message, status } =
        errorHandler[err.message as keyof typeof errorHandler];
      context.status = status;
      context.message = message;
    }
  }
});

userRoutes.delete("/user/:id", authenticationMiddleware, async (context) => {
  try {
    context.status = 200;
  } catch (err) {
    if (err instanceof Error) {
      const { message, status } =
        errorHandler[err.message as keyof typeof errorHandler];
      context.status = status;
      context.message = message;
    }
  }
});

export { userRoutes };
