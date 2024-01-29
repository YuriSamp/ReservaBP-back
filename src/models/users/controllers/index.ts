import { Context } from "koa";

import { createJWT } from "../../../services/createJWT";
import { signInDto } from "../dtos/signin";
import { signUpDto } from "../dtos/signup";

export async function signInUsers(context: Context) {
  const userData = signInDto(context.request.body);

  const jwtKey = createJWT(userData);

  context.status = 200;
  context.body = jwtKey;
}

export async function signUpUsers(context: Context) {
  const result = signUpDto(context.request.body);

  const jwtKey = createJWT(result);

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

  context.status = 200;
  context.body = arrayDeObjetos;
}
