import { NextFunction, Request, Response } from "express"
import { PrismaClient } from "@prisma/client";

export class UserController {
    //create user
    static async create(req: Request, res: Response, next: NextFunction) {
        //initialize prisma client
        const prisma = new PrismaClient()
        const result = await prisma.user.create({
            data: { ...req.body }
        })
        res.json(result)
    }

    //get user by username
    static async getByUsername(req: Request, res: Response, next: NextFunction) {
        const { username } = req.params

        //initialize prisma client
        const prisma = new PrismaClient()
        const user = await prisma.user.findUnique({
            where: { username: String(username) }
        })
        res.json(user)
    }

    //get all user
    static async getAll(req: Request, res: Response, next: NextFunction) {
        //initialize prisma client
        const prisma = new PrismaClient()
        const user = await prisma.user.findMany({});
        res.json(user)
    }

    //delete by username
    static async deteleByUsername(req: Request, res: Response, next: NextFunction) {
        const { username } = req.params
        //initialize prisma client
        const prisma = new PrismaClient()
        const user = await prisma.user.delete({
            where:{username:username}
        });
        res.json(user)
    }
}