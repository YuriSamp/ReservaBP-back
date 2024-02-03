import * as z from "zod";

const signUpSchema = z
  .object({
    role: z.enum(["Corretor de seguro", "Cliente"], {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "Tipo invalido para cargo" };
          case "invalid_enum_value":
            return { message: "Enum invalido para carog." };
          default:
            return { message: "Enum invalido para cargo" };
        }
      },
    }),
    email: z
      .string({
        required_error: "Email é um campo obrigatorio",
      })
      .email("Email Invalido"),
    name: z
      .string({ required_error: "Nome é um campo obrigatorio" })
      .min(3, "Nome deve ter ao menos 3 digitos"),
    profilePicture: z
      .string({
        required_error:
          "Foto de perfil é campo obrigatorio, coloque qualquer url",
      })
      .url("Foto de perfil precisa ser uma url"),
    password: z
      .string({
        required_error: "Senha é um campo obrigatório",
      })
      .min(8, "Senha precisa ter ao menos 8 digitos"),
    confirmPassword: z
      .string({
        required_error: "A confirmação de senha é um campo obrigatório",
      })
      .min(8, "A confirmação de senha precisa ter ao menos 8 digitos"),
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
