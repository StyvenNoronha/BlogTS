import { RequestHandler } from "express";

export const addPost: RequestHandler = async (request, response) => {
  response.json({ rota: "addPosts" });
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