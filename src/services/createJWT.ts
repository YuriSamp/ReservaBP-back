import jwt from "jsonwebtoken";

type payload = {
  email: string;
  password: string;
};

const JWT_KEY = process.env.JWT_KEY || "";
const EXPIRE_DATE = "1h";

export const createJWT = (payload: payload) => {
  const jwtKey = jwt.sign(payload, JWT_KEY, { expiresIn: EXPIRE_DATE });

  return jwtKey;
};
