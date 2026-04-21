import { RequestHandler, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import z from "zod";
import { createPost, createPostSlug, handleCover } from "../services/post";
import { getUserById } from "../services/user";
import { coverToUrl } from "../utils/cover-to-url";

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
    return response.json({ error: "sem arquivo" });
  }

  const coverName = await handleCover(request.file.path); // ou filename
  if (!coverName) {
    return response.json({ error: "Imagem não permitida/enviada" });
  }

  if (!request.user) {
    return response.status(401).json({ error: "Usuário não autenticado" });
  }

  const slug = await createPostSlug(data.data.title);

  const newPost = await createPost({
    authorId: request.user.id,
    slug,
    title: data.data.title,
    tags: data.data.tags,
    body: data.data.body,
    cover: coverName,
  });

  const author = await getUserById(newPost.authorId);

  response.status(201).json({
    post: {
      id: newPost.id,
      slug: newPost.slug,
      title: newPost.title,
      createAt: newPost.createdAt,
      cover: coverToUrl(newPost.cover),
      tags: newPost.tags,
      authorName: author?.name,
    },
  });
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
