import {
  authenticationMiddleware,
  login,
  payload,
  signUp,
} from "@/modules/auth/services/auth";
import { signInDto } from "@/modules/users/dtos/signin.dto";
import { signUpDto } from "@/modules/users/dtos/signup.dto";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUsers,
  updateUser,
} from "@/modules/users/services/user.service";
import { errorHandler } from "@/utils/error/error.handle";
import Router from "koa-router";
import { ZodError } from "zod";

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
    const token = signUp(userFromDb);
    context.status = 201;
    context.body = token;
  } catch (err) {
    if (err instanceof ZodError) {
      context.status = 400;
      context.message = err.errors.at(0)?.message as string;
      return;
    }
    if (err instanceof Error) {
      console.log(err);
      const { message, status } =
        errorHandler[err.message as keyof typeof errorHandler];
      context.status = status;
      context.message = message;
    }
  }
});

userRoutes.get("/users", authenticationMiddleware, async (context) => {
  try {
    const users = await getUsers();

    context.status = 200;
    context.body = users;
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
    const { email } = context.user as payload;
    const userData = await getUserByEmail(email);

    const user = {
      id: userData._id,
      role: userData.role,
      email: userData.email,
      profilePicture: userData.profilePicture,
      name: userData.name,
    };

    context.body = user;
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

userRoutes.put("/user/:id", authenticationMiddleware, async (context) => {
  try {
    const userId = context.params.id;
    const userData = signUpDto(context.request.body);
    await updateUser(userId as string, userData);
    context.status = 200;
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

userRoutes.delete("/user/:id", authenticationMiddleware, async (context) => {
  try {
    const userId = context.params.id;
    await deleteUser(userId as string);
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
