import {PrismaClient,User,Sale} from '@prisma/client'
const prisma = new PrismaClient();
import {userValidator} from '../../utils/auth/auth.util';
import { saleFilter } from 'src/utils/helper/filter';


export const saleMutation = {
    submitSale:async(_,{sale:args},context)=>{
        const user:User = await userValidator(context.req);
        
        const sale = await prisma.sale.create({data:{userId:user.id,...args}});
        if(!sale){
            throw new Error("در ثبت این اگهی مشکلی رخ داد!");
        }

        return sale;
    },
    editSale:async(_,{saleId,sale:args},context)=>{
        const user:User = await userValidator(context.req);

        const sale = await prisma.sale.update({
            where:{id:saleId,userId:user.id},
            data:{...args}
        });

        const updatedSale = await prisma.sale.findUnique({where:{id:sale.id}});
        if(!updatedSale){
            throw new Error(
                "در بروزرسانی ملک مشکلی بوجود امد!"
            );
        }

        return updatedSale;
    },
    filterSale:async(_,{filter},context)=>{
        const {
            room,
            priceFrom = 0,
            priceTo,
            buildYearFrom = 0,
            buildYearTo = 9999,
            meterageFrom = 0,
            meterageTo = 999999,
            type=[
                "Apartment",
                "Pilot",
                "Basement",
                "Land",
                "Resident",
                "Buyer",
                "Rent"
            ],
        } = filter;

        const sale = await prisma.sale.findMany({
            where:{
                AND:[
                    {...(room !== undefined && { room:{gte:room}})},
                    {...(priceFrom !== undefined &&{price:{gte:priceFrom}})},
                    {...(priceTo !== undefined &&{price:{lte:priceTo}})},
                    {buildYear:{gte:buildYearFrom,lte:buildYearTo}},
                    {meterage:{gte:meterageFrom,lte:meterageTo}},
                    {type:{in:type}},
                ]
 
            }
        });

        if(sale.length  == 0) throw new Error('ملکی مشابه نیاز های شما یافت نشد!');

        return sale;
    },
    selfPropertyFilter:async(_,{filter},context)=>{
        const user:User = await userValidator(context.req);
        const {
            room,
            priceFrom = 0,
            priceTo,
            buildYearFrom = 0,
            buildYearTo = 9999,
            meterageFrom = 0,
            meterageTo = 999999,
            type=[
                "Apartment",
                "Pilot",
                "Basement",
                "Land",
                "Resident",
                "Buyer",
                "Rent"
            ],
        } = filter;

        const sale = await prisma.sale.findMany({
            where:{
                AND:[
                    {userId:user.id},
                    {...(room !== undefined && { room:{lte:room}})},
                    {...(priceFrom !== undefined &&{price:{gte:priceFrom}})},
                    {...(priceTo !== undefined &&{price:{lte:priceTo}})},
                    {buildYear:{gte:buildYearFrom,lte:buildYearTo}},
                    {meterage:{gte:meterageFrom,lte:meterageTo}},
                    {type:{in:type}},
                ]
 
            }
        });

        if(sale.length == 0) throw new Error('ملکی با این شرایط ثبت نکرده اید!')

        return sale;
    },
    singleSale:async(_,{id})=>{
        const sale = await prisma.sale.findUnique({where:{id}});
        if(!sale){
            throw new Error('آگهی فروش یافت نشد!');
        }else{
            await prisma.sale.update({where:{id},data:{watchCount:{increment:1}}});
        }

        return sale;
    },
    deleteSale:async(_,{id},context)=>{
        const user:User = await userValidator(context.req);

        const sale = await prisma.sale.delete({where:{id,userId:user.id}});
        if(!sale) throw new Error('حذف ملک با خطا مواجه شد!');
        return `ملک ${sale.title} با موفقیت حذف شد!`;
    },
    highToLowSale:async(_,{reverse},context)=>{
        const sales = (await prisma.sale.findMany({})).sort((s1,s2)=>  +s2.price - +s1.price);
       
        if(!sales.length) throw new Error("ملکی در سایت موجود نیست!");

        if(reverse){
            sales.reverse();
        };

        return sales;
    },
    filteredSale:async(_,{type},context)=>{
        let sales = await prisma.sale.findMany();
        if(type){
            sales = sales.filter((sale)=> sale.type.toString() == type.toString());
        };
        
        const filter = saleFilter(sales);
        return filter;
    },
};

export const saleQuery = {
    allSale:async()=>{
        const sales = await prisma.sale.findMany();
        if(sales.length == 0) throw new Error('ملکی در سایت ثبت نشده است!');
        return sales;
    },
    topViewedSales:async()=>{
        const sales = (await prisma.sale.findMany({})).sort((a,b)=>a.watchCount - b.watchCount);
        if(sales.length == 0){
            throw new Error('ملکی در سایت موجود نیست');
        }

        return sales;
    },

}
