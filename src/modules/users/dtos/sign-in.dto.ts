import * as z from "zod";

const signInSchema = z.object({
  email: z.string().email("Email Invalido"),
  password: z.string().min(8, "Senha precisa ter ao menos 8 digitos"),
});

export const signInDto = (userCredentials: unknown) => {
  const validatedUser = signInSchema.parse(userCredentials);

  return validatedUser;
};
