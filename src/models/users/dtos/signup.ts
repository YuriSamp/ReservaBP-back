import * as z from "zod";

const signUpSchema = z
  .object({
    role: z.union([z.literal("Corretor"), z.literal("Cliente")]),
    email: z.string().email("Invalid mail"),
    name: z.string().min(3, "Name must have at least 3 digits"),
    profilePicture: z.string().url("Profile picture must be an url"),
    password: z.string().min(8, "Password length lower than 8 digits"),
    confirmPassword: z.string().min(8, "Password length lower than 8 digits"),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signUpDto = (userCredentials: unknown) => {
  const credentials = signUpSchema.parse(userCredentials);

  return credentials;
};
