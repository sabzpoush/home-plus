import { PrismaClient, User } from '@prisma/client';
import { userValidator } from '../../utils/auth/auth.util';
const prisma = new PrismaClient();

export const buyerResolver = {
    submitBuyer:async(_,{buyer:args},context)=>{
        const user:User = await userValidator(context.req);
        
        const buyer = await prisma.buyer.create({data:{...args,userId:user.id}});
        if(!buyer){
            throw new Error('در ثبت آگهی خرید شما مشکلی بوجودامد!');
        }

        return buyer;
    },
};

export const buyerQuery = {
    allBuyer:async()=>{
        return await prisma.buyer.findMany();
    }
};