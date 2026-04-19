import { RequestHandler } from "express";
import { z } from "zod";
import { createUser, verifyUser } from "../services/user";
import { createToken } from "../services/auth";

export const signup: RequestHandler = async (request, response) => {
  //verificar com zod se esta certo
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const data = schema.safeParse(request.body);

  if (!data.success) {
    return response
      .status(400)
      .json({ error: data.error.flatten().fieldErrors });
  }

  //criar usuário
  const newUser = await createUser(data.data);

  if (!newUser) {
    return response.json({ Error: "Error ao criar usuário" });
  }

  //criando token para o usuário
  const token = createToken(newUser);

  response.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  });
};

export const signin: RequestHandler = async (request, response) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const data = schema.safeParse(request.body);

  if (!data.success) {
    return response.json({ error: data.error.flatten().fieldErrors });
  }

  const user = await verifyUser(data.data);
  if (!user) {
    return response.json({ error: "Acesso negado" });
  }

  const token = createToken(user);

  response.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

export const validate: RequestHandler = async (request, response) => {
  response.json({ rota: "validate" });
};
