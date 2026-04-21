import { NextFunction, Response } from "express";
import { verifyRequest } from "../services/auth";
import { ExtendedRequest } from "../types/extended-request";

export const privateRoute = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  const user = await verifyRequest(request);
  if (!user) {
    return response.status(401).json({ error: "Acesso negado" });
  }
  request.user = user;
  next();
};
