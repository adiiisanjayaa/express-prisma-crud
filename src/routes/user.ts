import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();

//get user by username
router.get("/", UserController.getAll);
//get user by username
router.get("/:username", UserController.getByUsername);
//create user
router.post("/", UserController.create);
//delete user by username
router.delete("/:username", UserController.deteleByUsername);


export default router;