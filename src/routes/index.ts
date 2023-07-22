import { Router } from "express";
import post from "./post";
import user from "./user";

const routes = Router();

routes.use("/post", post);
routes.use("/user", user);

export default routes;
