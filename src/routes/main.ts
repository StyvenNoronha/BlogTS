import { Router } from "express";
import * as mainController from "../controllers/main.controller"


export const mainRoutes = Router();


mainRoutes.get("/posts", mainController.getAllPosts)
mainRoutes.get("/posts/:slug", mainController.getPost)
mainRoutes.get("/posts/:slug/related", mainController.getRelatedPosts)

