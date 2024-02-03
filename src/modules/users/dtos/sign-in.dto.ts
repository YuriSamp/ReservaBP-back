import * as z from "zod";

const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email é um campo obrigatorio",
    })
    .email("Email Invalido"),
  password: z
    .string({
      required_error: "Senha é um campo obrigatorio",
    })
    .min(8, "Senha precisa ter ao menos 8 digitos"),
});

export const signInDto = (userCredentials: unknown) => {
  const validatedUser = signInSchema.parse(userCredentials);

  return validatedUser;
};
