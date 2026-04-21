import { RequestHandler } from "express";
import { getALLPostsPublished } from "../services/post";
import { coverToUrl } from "../utils/cover-to-url";
import slug from "slug";

export const getAllPosts: RequestHandler = async (request, response) => {
  let page = 1;
  if (request.query.page) {
    page = parseInt(request.query.page as string);
    if (page <= 0) {
      response.json({ error: "Pagina não existe" });
    }
  }
  let posts = await getALLPostsPublished(page)
    const postsToReturn = posts.map(post=>({
      id:post.id,
      title:post.title,
      createAt:post.createdAt,
      cover:coverToUrl,
      author:post.author,
      tags:post.tags,
      slug:slug
    }))
  
    response.json({posts:postsToReturn, page})
};

export const getPost: RequestHandler = async (request, response) => {
  response.json({ rota: "getPost" });
};

export const getRelatedPosts: RequestHandler = async (request, response) => {
  response.json({ rota: "getRelatedPosts" });
};
