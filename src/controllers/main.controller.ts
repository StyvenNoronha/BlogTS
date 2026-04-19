import { RequestHandler } from "express";

export const getAllPosts: RequestHandler = async (request, response) => {
  response.json({ rota: "getAllPosts" });
};

export const getPost: RequestHandler = async (request, response) => {
  response.json({ rota: "getPost" });
};

export const getRelatedPosts: RequestHandler = async (request, response) => {
  response.json({ rota: "getRelatedPosts" });
};
