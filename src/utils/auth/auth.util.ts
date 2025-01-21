import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';


// validate the user token and check the access
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
            const {email} = jwt.decode(authHeader) as any;

            const user = await prisma.user.findUnique({where:{email}});
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

// validate user without erorr
export async function userTokenValidator(req):Promise<User | null>{
    try{
        const key = process.env['SECRET_KEY'];

        if(req){
            const authorization = req.headers.authorization;
            const authHeader = authorization.split(" ")[1];
            
            if(authHeader){
                const verifyToken = jwt.verify(authHeader,key);
                if(!verifyToken){
                    return null;
                }
                const {email} = jwt.decode(authHeader) as any;
    
                const user = await prisma.user.findUnique({where:{email}});
                if(!user){
                    return null;
                }
                return user;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }catch(err){
        return null;
    }
}


// check the user token and validate it
export async function verifyUserToken(req):Promise<boolean>{
    try{
        const key = process.env['SECRET_KEY'];

        if(req){
            const authorization = req.headers.authorization;
            const authHeader = authorization.split(" ")[1];

            if(authHeader){
                try{
                    const verifyToken = jwt.verify(authHeader,key);
                    if(!verifyToken){
                        return false;
                    }
                }catch(e){
                    return false;
                }
                const {email} = jwt.decode(authHeader) as any;

                const user = await prisma.user.findUnique({where:{email}});
                if(!user){
                    return false;
                }
                return true;
            }else{
                return false;
            }
        }else{
           return false;
        }
    }catch(e){
        return false;
    }
}
