import { Router } from "express";
import { UserController } from "../controllers/userController";
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

//get user by username
router.get("/", [checkJwt], UserController.getAll);
//get user by username
router.get("/:username", [checkJwt], UserController.getByUsername);
//create user
router.post("/", [checkJwt], UserController.create);
//delete user by username
router.delete("/:username", [checkJwt], UserController.deteleByUsername);

export default router;