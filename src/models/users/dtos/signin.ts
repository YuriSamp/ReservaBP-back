import * as z from "zod";

const signInSchema = z.object({
  email: z.string().email("Invalid mail"),
  password: z.string().min(8, "Password length lower than 8 digits"),
});

export const signInDto = (userCredentials: unknown) => {
  const validaterUser = signInSchema.safeParse(userCredentials);

  if (!validaterUser.success) {
    throw new Error(`Invalid user data: ${validaterUser.error} `);
  }

  return validaterUser.data;
};
