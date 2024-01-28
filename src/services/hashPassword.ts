import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export const hashPassword = (password: string) => {
  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if (err) {
      throw Error("Ocorreu um erro ao hashear a senha");
    }
    return hash;
  });
};
