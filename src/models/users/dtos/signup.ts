import * as z from "zod";

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

export const signUpDto = (userCredentials: unknown) => {
  const validaterUser = signUpSchema.safeParse(userCredentials);

  if (!validaterUser.success) {
    throw new Error(`Invalid user data: ${validaterUser.error} `);
  }

  const credentials = {
    email: validaterUser.data.email,
    password: validaterUser.data.password,
  };

  return credentials;
};
