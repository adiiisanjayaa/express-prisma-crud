import { Router } from "express";
import post from "./post";
import user from "./user";
import auth from "./authentication";

const routes = Router();

routes.use("/post", post);
routes.use("/user", user);
routes.use("/auth", auth);

export default routes;
