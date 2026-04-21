import { User } from "../generated/prisma/client";
import { Request } from "express";
import { Multer } from "multer";
type UserWithoutPassword = Omit<User, "password">;

export type ExtendedRequest = Request & {
  user?: UserWithoutPassword;
  file?: Express.Multer.File;        // para upload único
  files?: Express.Multer.File[];     // se quiser múltiplos arquivos
};
