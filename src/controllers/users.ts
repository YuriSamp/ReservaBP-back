// this line solve this issue https://github.com/koajs/koa-body/issues/109
/// <reference path='../../node_modules/@types/koa-bodyparser/index.d.ts' />
import { Context } from "koa";
import * as z from "zod";

import { createJWT } from "../services/createJWT";
import { hashPassword } from "../services/hashPassword";

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

  const jwtKey = createJWT(result.data);

  context.status = 200;
  context.body = jwtKey;
}

export async function signUpUsers(context: Context) {
  const result = signUpSchema.safeParse(context.request.body);

  if (!result.success) {
    context.status = 401;
    context.body = {
      mensage: result.error.issues.at(0)?.message,
    };
    return;
  }

  const jwtKey = createJWT(result.data);

  context.status = 200;
  context.body = jwtKey;
}

export async function getAllUser(context: Context) {
  const arrayDeObjetos = [
    {
      id: 1,
      name: "John Doe",
      location: "New York",
      profilePicture: "https://github.com/YuriSamp.png",
      email: "teste@gmail.com",
    },
    {
      id: 2,
      name: "Alice Smith",
      location: "Los Angeles",
      profilePicture: "https://http.cat/400.jpg",
      email: "test2e@gmail.com",
    },
    {
      id: 3,
      name: "Bob Johnson",
      location: "Chicago",
      profilePicture: "https://http.cat/300.jpg",
      email: "teste3@gmail.com",
    },
    {
      id: 4,
      name: "Emily Davis",
      location: "San Francisco",
      profilePicture: "https://http.cat/200.jpg",
      email: "teste4@gmail.com",
    },
    {
      id: 5,
      name: "Michael Wilson",
      location: "Miami",
      profilePicture: "https://http.cat/100.jpg",
      email: "teste5@gmail.com",
    },
  ];

  const token = context.header.authorization;

  console.log(token?.split(" ").at(1));
  context.status = 200;
  context.body = arrayDeObjetos;
}
