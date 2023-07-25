import { Request, Response } from "express"
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { validate } from "class-validator";
import { PrismaClient } from "@prisma/client";
import Helper from '../utilities/helpers'




class AuthController {
    //login user
    static async login(req: Request, res: Response) {
        //Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).send();
        }

        //Get user from database
        let user;
        try {
            //initialize prisma client
            const prisma = new PrismaClient()
            user = await prisma.user.findUnique({
                where: { username: String(username) }
            })
            console.log('user response :', user)
        } catch (error) {
           return res.status(401).send();
        }

        if(user==undefined){
            return res.status(401).send();
        }

        //Check if encrypted password match
        if (!Helper.AuthHelper.checkIfUnencryptedPasswordIsValid(user.password, password)) {
            res.status(400).send();
            return;
        }
    
        //sign JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        //Send the jwt in the response
        return res.send(token);
    }

    //register user
    static async register(req: Request, res: Response) {
        //Get parameters from the body
        let { username, password, email } = req.body;

        // //Validade if the parameters are ok
        // const errors = await validate(user);
        // if (errors.length > 0) {
        //     res.status(400).send(errors);
        //     return;
        // }

        //Try to save. If fails, the username is already 
        
        //initialize prisma client
        const prisma = new PrismaClient()
        await prisma.user.create({
            data: {
                'email':email,
                'username':username,
                'password':Helper.AuthHelper.hashPassword(password),
            }
        }).then().catch((e)=>{
            console.log("error register: ",e);
            res.status(409).send("Username already in use");
            return;
        })
       
        //If all ok, send 201 response
        return res.status(201).send("User created");
    }

    // static async changePassword(req: Request, res: Response){
    //     //Get ID from JWT
    //     const id = res.locals.jwtPayload.userId;
    //     let userRepository = AppDataSource.getRepository(User);

    //     //Get parameters from the body
    //     const { oldPassword, newPassword } = req.body;
    //     if (!(oldPassword && newPassword)) {
    //         res.status(400).send();
    //     }

    //     //Get user from the database
    //     let user: User;
    //     try {
            
    //         user = await userRepository.findOneOrFail({
    //             where:{id}
    //         });
    //     } catch (id) {
    //         res.status(401).send();
    //     }

    //     //Check if old password matchs
    //     if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
    //         res.status(401).send();
    //         return;
    //     }

    //     //Validate de model (password lenght)
    //     user.password = newPassword;
    //     const errors = await validate(user);
    //     if (errors.length > 0) {
    //         res.status(400).send(errors);
    //         return;
    //     }
    //     //Hash the new password and save
    //     user.hashPassword();
    //     userRepository.save(user);

    //     res.status(204).send();
    // }
}

export default AuthController;