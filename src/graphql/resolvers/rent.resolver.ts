import {PrismaClient, User,Rent} from '@prisma/client'
import { userValidator } from 'src/utils/auth/auth.util';
const prisma = new PrismaClient();

export const rentResolver = {
    submitSale:async(_,{rent},context)=>{
        const user:User = await userValidator(context.req);
        const rents = await prisma.rent.create({data:{...rent,user:{connect:{id:user.id}}}});
        if(!rents){
            throw new Error("در ثبت این اگهی مشکلی رخ داد!");
        }

        return rents;
    }
};

export const rentQuery = {
    allRent:async()=>{
        return await prisma.rent.findMany();
    },
}

