import { Router } from "express";
import  AuthController  from "../controllers/authController";

const router = Router();

//login user
router.post("/login", AuthController.login);
//register user
router.post("/register", AuthController.register);

export default router;