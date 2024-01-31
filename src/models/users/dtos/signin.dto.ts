import * as z from "zod";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password length lower than 8 digits"),
});

export const signInDto = (userCredentials: unknown) => {
  const validaterUser = signInSchema.parse(userCredentials);

  return validaterUser;
};
