import { Router } from "express";
import PostController from "../controllers/postController";
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

//get post
router.get("/", [checkJwt], PostController.getAllPost);
//create post
router.post("/", [checkJwt], PostController.create);
//update post
router.put("/:id", [checkJwt], PostController.update);
//delete post
router.delete("/:id", [checkJwt], PostController.delete);

export default router;