import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const buyerResolver = {
    submitBuyer:async(_,{buyer},context)=>{
        
    },
};

export const buyerQuery = {
    allBuyer:async()=>{
        return await prisma.buyer.findMany();
    }
};