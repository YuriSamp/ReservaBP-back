import { login, payload, signUp } from "@/modules/auth/services/auth.service";
import { getCredentials } from "@/modules/users/dtos/get-credentials.dto";
import { getUserReponseDto } from "@/modules/users/dtos/get-user.dto";
import { signInDto } from "@/modules/users/dtos/sign-in.dto";
import { signUpDto } from "@/modules/users/dtos/sign-up.dto";
import { User } from "@/modules/users/model/user.type";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUsers,
  updateUser,
} from "@/modules/users/services/user.service";
import { authenticationMiddleware } from "@/shared/auth.middleware";
import { handleErrors } from "@/shared/error/error.handle";
import Router from "koa-router";

const userRoutes = new Router();

userRoutes.post("/signin", async (context) => {
  try {
    const userData = signInDto(context.request.body);
    const token = await login(userData);

    context.status = 200;
    context.body = token;
  } catch (err) {
    const { message, status } = handleErrors(err);
    context.status = status;
    context.message = message;
  }
});

userRoutes.post("/signup", async (context) => {
  try {
    const userData = signUpDto(context.request.body);
    const userFromDb = await createUser(userData);
    const credentials = getCredentials(userFromDb as User);
    const token = signUp(credentials);
    context.status = 201;
    context.body = token;
  } catch (err) {
    const { message, status } = handleErrors(err);
    context.status = status;
    context.message = message;
  }
});

userRoutes.get("/users", authenticationMiddleware, async (context) => {
  try {
    const usersData = await getUsers();
    const users = getUserReponseDto(usersData as User[]);
    context.status = 200;
    context.body = users;
  } catch (err) {
    if (err instanceof Error) {
      const { message, status } = handleErrors(err);
      context.status = status;
      context.message = message;
    }
  }
});

userRoutes.get("/user/me", authenticationMiddleware, async (context) => {
  try {
    const { email } = context.user as payload;
    const userData = await getUserByEmail(email);
    const user = getUserReponseDto(userData as User);

    context.body = user;
    context.status = 200;
  } catch (err) {
    const { message, status } = handleErrors(err);
    context.status = status;
    context.message = message;
  }
});

userRoutes.put("/user/:id", authenticationMiddleware, async (context) => {
  try {
    const userId = context.params.id;
    const userData = signUpDto(context.request.body);
    await updateUser(userId as string, userData);
    context.status = 200;
    context.message = "Usuário atualizado com sucesso";
  } catch (err) {
    const { message, status } = handleErrors(err);
    context.status = status;
    context.message = message;
  }
});

userRoutes.delete("/user/:id", authenticationMiddleware, async (context) => {
  try {
    const userId = context.params.id;
    await deleteUser(userId as string);
    context.status = 200;
  } catch (err) {
    const { message, status } = handleErrors(err);
    context.status = status;
    context.message = message;
  }
});

export { userRoutes };
