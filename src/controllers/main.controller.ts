import { RequestHandler } from "express";
import { getALLPostsPublished, getPostBySlug } from "../services/post";
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
    const { slug } = request.params;
  
    const post = await getPostBySlug(String(slug));
    if (!post) {
    return response.json({ error: "Post nao existe" });
  }

  if(post.status !== 'PUBLISHED'){
    response.json({error:"Post não publicado"})
  }
  response.json({
    post: {
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      cover: coverToUrl(post.cover),
      authorName: post.author?.name,
      tags: post.tags,
      body: post.body,
      slug: post.slug,
    },
  });
};

export const getRelatedPosts: RequestHandler = async (request, response) => {
  response.json({ rota: "getRelatedPosts" });
};
