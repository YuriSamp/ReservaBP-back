import {
  getAllUser,
  signInUsers,
  signUpUsers,
} from "../models/users/controllers";

type ApiRoutes = {
  path: string;
  method: "get" | "post" | "delete";
  // we don't care about the action signature
  action: (...args: any) => Promise<void>;
};

export const apiRoutes: ApiRoutes[] = [
  {
    path: "/signin",
    method: "post",
    action: signInUsers,
  },
  {
    path: "/signup",
    method: "post",
    action: signUpUsers,
  },
  {
    path: "/users",
    method: "get",
    action: getAllUser,
  },
];
