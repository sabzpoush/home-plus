import {PrismaClient, User,Rent} from '@prisma/client'
import { userValidator } from '../../utils/auth/auth.util';
const prisma = new PrismaClient();

export const rentResolver = {
    submitRent:async(_,{rent},context)=>{
        const user:User = await userValidator(context.req);
        const rents = await prisma.rent.create({data:{...rent,user:{connect:{id:user.id}}}});
        if(!rents){
            throw new Error("در ثبت این اگهی مشکلی رخ داد!");
        }

        return rents;
    },
    deleteRent:async(_,{id},context)=>{
        const user:User = await userValidator(context.req);

        const rent = await prisma.rent.delete({where:{id,userId:user.id}});
        if(!rent) throw new Error('حذف ملک با خطا مواجه شد!');
        return `آگهی رهن ${rent.title} با موفقیت حذف شد!`;
    }
};

export const rentQuery = {
    allRent:async()=>{
        return await prisma.rent.findMany();
    },
}

