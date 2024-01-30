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
  const credentials = signUpSchema.parse(userCredentials);

  return credentials;
};
