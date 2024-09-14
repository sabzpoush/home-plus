import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export const rentResolver = {
    submitSale:async(_,args)=>{
        const sale = await prisma.sale.create({data:{...args}});
        if(!sale){
            throw new Error("در ثبت این اگهی مشکلی رخ داد!");
        }

        return sale;
    }
};

export const rentQuery = {
    allRent:async()=>{
        return await prisma.rent.findMany();
    },
}

