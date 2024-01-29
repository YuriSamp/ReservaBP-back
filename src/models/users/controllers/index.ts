import { login } from "@/models/auth/services/auth";
import { signInDto } from "@/models/users/dtos/signin";
import { signUpDto } from "@/models/users/dtos/signup";
import bcrypt from "bcrypt";
import { Context } from "koa";

export async function signInUsers(context: Context) {
  const userData = signInDto(context.request.body);

  const token = login(userData);

  context.status = 200;
  context.body = token;
}

export async function signUpUsers(context: Context) {
  const userData = signUpDto(context.request.body);

  const token = login(userData);

  context.status = 200;
  context.body = token;
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

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};
