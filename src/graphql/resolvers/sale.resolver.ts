import {PrismaClient,User,Sale} from '@prisma/client'
const prisma = new PrismaClient();
import {userValidator} from '../../utils/auth/auth.util';


export const saleResolver = {
    submitSale:async(_,{sale:args},context)=>{
        const user:User = await userValidator(context.req);
        
        const sale = await prisma.sale.create({data:{userId:user.id,...args}});
        if(!sale){
            throw new Error("در ثبت این اگهی مشکلی رخ داد!");
        }

        return sale;
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
                    {...(room !== undefined && { room:{lte:room}})},
                    {...(priceFrom !== undefined &&{price:{gte:priceFrom}})},
                    {...(priceTo !== undefined &&{price:{lte:priceTo}})},
                    {buildYear:{gte:buildYearFrom,lte:buildYearTo}},
                    {meterage:{gte:meterageFrom,lte:meterageTo}},
                    {type:{in:type}},
                ]
 
            }
        });
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
    }
};

export const saleQuery = {
    allSale:async()=>{
        return await prisma.sale.findMany();
    }
}
