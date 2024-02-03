import * as z from "zod";

const signUpSchema = z
  .object({
    role: z.union([z.literal("Corretor de seguro"), z.literal("Cliente")]),
    email: z
      .string({
        required_error: "Email é um campo obrigatorio",
      })
      .email("Email Invalido"),
    name: z
      .string({ required_error: "name é um campo obrigatorio" })
      .min(3, "Nome deve ter ao menos 3 digitos"),
    profilePicture: z
      .string({
        required_error:
          "profile picture é campo obrigatorio, coloque qualquer url",
      })
      .url("Foto de perfil precisa ser url"),
    password: z
      .string({
        required_error: "Senha é um campo obrigatório",
      })
      .min(8, "Senha precisa ter ao menos 8 digitos"),
    confirmPassword: z
      .string({
        required_error: "A confirmação de senha é um campo obrigatório",
      })
      .min(8, "Senha precisa ter ao menos 8 digitos"),
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
