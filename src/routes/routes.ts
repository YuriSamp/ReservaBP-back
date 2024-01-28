import { signInUsers, signUpUsers } from "../controllers/users";

type ApiRoutes = {
  path: string;
  method: "get" | "post" | "delete";
  //fix later
  action: (...args: any) => Promise<void>;
};

export const apiRoutes: ApiRoutes[] = [
  {
    path: "/signin",
    method: "get",
    action: signInUsers,
  },
  {
    path: "/signup",
    method: "get",
    action: signUpUsers,
  },
];
