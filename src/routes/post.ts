import { Router } from "express";
import PostController from "../controllers/postController";

const router = Router();

//get post
router.get("/", PostController.getAllPost);
//create post
router.post("/", PostController.create);
//update post
router.put("/:id", PostController.update);
//delete post
router.delete("/:id", PostController.delete);

export default router;