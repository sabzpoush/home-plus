import {PrismaClient,User,Sale} from '@prisma/client'
const prisma = new PrismaClient();
import {userValidator} from '../../utils/auth/auth.util';


export const saleResolver = {
    submitSale:async(_,args,context)=>{
        const user:User = await userValidator(context.req);
        
        const sale = await prisma.sale.create({data:{userId:user.id,...args}});
        if(!sale){
            throw new Error("در ثبت این اگهی مشکلی رخ داد!");
        }

        return sale;
    },

};

export const saleQuery = {
    allSale:async()=>{
        return await prisma.sale.findMany();
    }
}