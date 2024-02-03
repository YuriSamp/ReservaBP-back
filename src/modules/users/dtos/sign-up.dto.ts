import * as z from "zod";

const signUpSchema = z
  .object({
    role: z.union([z.literal("Corretor de seguro"), z.literal("Cliente")]),
    email: z.string().email("Email Invalido"),
    name: z.string().min(3, "Nome deve ter ao menos 3 digitos"),
    profilePicture: z.string().url("Foto de perfil precisa ser url"),
    password: z.string().min(8, "Senha precisa ter ao menos 8 digitos"),
    confirmPassword: z.string().min(8, "Senha precisa ter ao menos 8 digitos"),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Senhas não correspondem",
    path: ["confirmPassword"],
  });

export type RequestUserDTO = {
  role: string;
  email: string;
  name: string;
  profilePicture: string;
  password: string;
};

export const signUpDto = (userCredentials: unknown): RequestUserDTO => {
  const { email, name, password, profilePicture, role } =
    signUpSchema.parse(userCredentials);

  const credentials = { email, name, password, profilePicture, role };

  return credentials;
};
