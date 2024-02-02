import { login, payload, signUp } from "@/modules/auth/services/auth.service";
import { getUserReponseDto } from "@/modules/users/dtos/getuser.dto";
import { signInDto } from "@/modules/users/dtos/signin.dto";
import { signUpDto } from "@/modules/users/dtos/signup.dto";
import { User } from "@/modules/users/model/user.type";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "@/modules/users/services/user.service";
import { handleUserErrors } from "@/modules/users/utils/user.error.handler";
import { authenticationMiddleware } from "@/shared/auth.middleware";
import Router from "koa-router";

const userRoutes = new Router();

//200, 400, 404,
userRoutes.post("/signin", async (context) => {
  try {
    const userData = signInDto(context.request.body);
    const token = await login(userData);

    context.status = 200;
    context.body = token;
  } catch (err) {
    const { message, status } = handleUserErrors(err);
    context.status = status;
    context.message = message;
  }
});

//201. 400, 409
userRoutes.post("/signup", async (context) => {
  try {
    const userData = signUpDto(context.request.body);
    const userFromDb = await createUser(userData);
    const token = signUp(userFromDb);
    context.status = 201;
    context.body = token;
  } catch (err) {
    const { message, status } = handleUserErrors(err);
    context.status = status;
    context.message = message;
  }
});

//200, 401
userRoutes.get("/users", authenticationMiddleware, async (context) => {
  try {
    const usersData = await getUsers();
    const users = getUserReponseDto(usersData as User[]);
    context.status = 200;
    context.body = users;
  } catch (err) {
    if (err instanceof Error) {
      const { message, status } = handleUserErrors(err);
      context.status = status;
      context.message = message;
    }
  }
});

// 200, 401 ou 404
userRoutes.get("/user/me", authenticationMiddleware, async (context) => {
  try {
    const { email } = context.user as payload;
    const userData = await getUserById(email);

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
    const { message, status } = handleUserErrors(err);
    context.status = status;
    context.message = message;
  }
});

// 200, 400, 401, 404
userRoutes.put("/user/:id", authenticationMiddleware, async (context) => {
  try {
    const userId = context.params.id;
    const userData = signUpDto(context.request.body);
    await updateUser(userId as string, userData);
    context.status = 200;
    context.message = "usuário atualizado com sucesso";
  } catch (err) {
    const { message, status } = handleUserErrors(err);
    context.status = status;
    context.message = message;
  }
});

// 200, 400, 401, 404
userRoutes.delete("/user/:id", authenticationMiddleware, async (context) => {
  try {
    const userId = context.params.id;
    await deleteUser(userId as string);
    context.status = 200;
  } catch (err) {
    const { message, status } = handleUserErrors(err);
    context.status = status;
    context.message = message;
  }
});

export { userRoutes };
