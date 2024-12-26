import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import {userValidator} from '../../utils/auth/auth.util';

export const allResolvers = {
    findProperty:async(_,{id},context)=>{
        const property =
            await prisma.sale.findUnique({where:{id}}) ||
            await prisma.rent.findUnique({where:{id}}) ||   
            await prisma.buyer.findUnique({where:{id}});
        
        if(!property){
            throw new Error('خانه ای یافت نشد!');
        }
        const result = JSON.stringify(property);
        return {result};
    },
    searchProperty:async(_,{title},context)=>{

        const sale = await prisma.sale.findMany();
        const rent = await prisma.rent.findMany();
        const buyer = await prisma.buyer.findMany();


        const regex = new RegExp(`^.*${title}.*$`);
        const sales = sale.filter((prop)=>{
            return regex.test(prop.title);
        });

        const rents = rent.filter((prop)=>{
            return regex.test(prop.title);
        });

        const buyers = buyer.filter((prop)=>{
            return regex.test(prop.title);
        });
        
        return {sales,rents,buyers};
    },

}