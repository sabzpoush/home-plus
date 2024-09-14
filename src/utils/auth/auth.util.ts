import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';

export async function userValidator(req):Promise<User>{
    const key = process.env['SECRET_KEY'];

    if(req){
        const authorization = req.headers.authorization;
        const authHeader = authorization.split(" ")[1];
        
        if(authHeader){
            const verifyToken = jwt.verify(authHeader,key);
            if(!verifyToken){
                throw new Error("Token expired!");
            }
            const {phone} = jwt.decode(authHeader) as any;

            const user = await prisma.user.findUnique({where:{phone}});
            if(!user){
                throw new Error("User Not Found!");
            }
            return user;
        }else{
            throw new Error("No Token!")
        }
    }else{
        throw new Error("Cant authoriz!");
    }
}
