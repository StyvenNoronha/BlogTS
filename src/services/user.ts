import bcrypt from "bcryptjs";
import { prisma } from "../libs/prisma";

//tipagem de usuário
type CreateUserProps = {
  name: string;
  email: string;
  password: string;
};

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserProps) => {
  email = email.toLowerCase();

  //verificar se no banco de dados tem esse email
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (user) return false;

  //criar o hash da senha
  const newPassword = bcrypt.hashSync(password);

  //criar o usuário
  return await prisma.user.create({
    data: {
      name,
      email,
      password: newPassword,
    },
  });
};

type VerifyUserProps = {
  email: string;
  password: string;
};

export const verifyUser = async ({ email, password }: VerifyUserProps) => {
  //verificar usuário e a senha
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user || !bcrypt.compareSync(password, user.password)) return false;

  return user;
};
