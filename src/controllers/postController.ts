import { Request, Response } from "express"
// import * as jwt from "jsonwebtoken";
// import config from "../config/config";
// import { validate } from "class-validator";
import { PrismaClient } from "@prisma/client";

class PostController {

    //get all post
    static async getAllPost(req: Request, res: Response) {
        //initialize prisma client
        const prisma = new PrismaClient()
        const posts = await prisma.post.findMany({
            include: { author: true }
        })
        res.json(posts)
    }

    //get all post
    static async getPostById(req: Request, res: Response) {
        //initialize prisma client
        const prisma = new PrismaClient()
        const { id } = req.params
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
        })
        res.json(post)
    }

    //create post
    static async create(req: Request, res: Response) {
        //initialize prisma client
        const prisma = new PrismaClient()
        
        const { content, authorEmail } = req.body
        const result = await prisma.post.create({
            data: {
            content,
            author: { connect: { email: authorEmail } }
            }
        })
        res.json(result)
    }

    //update post
    static async update(req: Request, res: Response) {
        //initialize prisma client
        const prisma = new PrismaClient()
        
        const { id } = req.params
        const post = await prisma.post.update({
            where: { id: Number(id) },
            data: {
            ...req.body
            }
        })

        res.json(post)
    }

    //delete post
    static async delete(req: Request, res: Response) {
        //initialize prisma client
        const prisma = new PrismaClient()
        
        const { id } = req.params
        const post = await prisma.post.delete({
            where: { id: Number(id) },
        })
        res.json(post)
    }

    


}

export default PostController;