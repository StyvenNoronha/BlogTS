import { RequestHandler, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import z from "zod";

export const addPost = async (request: ExtendedRequest, response: Response) => {
  const schema = z.object({
    title: z.string(),
    tags: z.string(),
    body: z.string(),
  });
  const data = schema.safeParse(request.body);
  if (!data.success) {
    return response.json({ error: data.error.flatten().fieldErrors });
  }

  if (!request.file) {
    response.json({ error: "sem arquivo " });
  }

  
};

export const getPosts: RequestHandler = async (request, response) => {
  response.json({ rota: "getPosts" });
};

export const getPost: RequestHandler = async (request, response) => {
  response.json({ rota: "getPost" });
};

export const editPost: RequestHandler = async (request, response) => {
  response.json({ rota: "editPost" });
};

export const removePost: RequestHandler = async (request, response) => {
  response.json({ rota: "removePost" });
};
