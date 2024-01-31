import * as z from "zod";

const signUpSchema = z
  .object({
    role: z.union([z.literal("Consultor"), z.literal("Cliente")]),
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

export type signUpRequest = {
  role: string;
  email: string;
  name: string;
  profilePicture: string;
  password: string;
};

export const signUpDto = (userCredentials: unknown): signUpRequest => {
  const { email, name, password, profilePicture, role } =
    signUpSchema.parse(userCredentials);

  const credentials = { email, name, password, profilePicture, role };

  return credentials;
};
