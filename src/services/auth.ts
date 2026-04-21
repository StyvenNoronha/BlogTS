import { Request } from "express";
import { User } from "../generated/prisma/client";
import { createJWT, readJwt } from "../libs/jwt";
import { TokenPayload } from "../types/token-payload";
import { getUserById } from "./user";

export const createToken = (user: User) => {
  return createJWT({ id: user.id });
};

export const verifyRequest = async (request: Request) => {
  const { authorization } = request.headers;

  if (authorization) {
    const authSplit = authorization.split("Bearer ");
    if (authSplit[1]) {
      const payload = readJwt(authSplit[1]);
      if (payload) {
        const userId = (payload as TokenPayload).id;
        const user = await getUserById(userId);
        if (user) return user;
      }
    }
  }
  return false;
};
