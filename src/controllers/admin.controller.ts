import { RequestHandler, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import z, { string } from "zod";
import {
  createPost,
  createPostSlug,
  getPostBySlug,
  handleCover,
  updatePost,
} from "../services/post";
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

export const editPost = async (
  request: ExtendedRequest,
  response: Response,
) => {
  const { slug } = request.params;
  const schema = z.object({
    status: z.enum(["PUBLISHED", "DRAFT"]).optional(),
    body: string().optional(),
  });
  
  const data = schema.safeParse(request.body);
  if (!data.success) {
    return response.json({ error: data.error.flatten().fieldErrors });
  }

  const post = await getPostBySlug(String(slug));
  if (!post) {
    return response.json({ error: "Post Inexistente" });
  }

  let coverName: string | undefined = undefined;
  if (request.file) {
    coverName = await handleCover(String(request.file));
  }

  const updatedPost = await updatePost(slug, {
    updatedAt: new Date(),
    status: data.data.status ?? undefined,
    //title: data.data.title ?? undefined,
    //tags: data.data.tags ?? undefined,
    body: data.data.body ?? undefined,
    cover: coverName ? coverName : undefined,
  });

  const author = await getUserById(updatedPost.authorId);

  response.json({
    post: {
      id: updatedPost.id,
      status: updatedPost.status,
      slug: updatedPost.slug,
      title: updatedPost.title,
      createdAt: updatedPost.createdAt,
      cover: coverToUrl(updatedPost.cover),
      tags: updatedPost.tags,
      authorName: author?.name,
    },
  });
};

export const removePost: RequestHandler = async (request, response) => {
  response.json({ rota: "removePost" });
};
