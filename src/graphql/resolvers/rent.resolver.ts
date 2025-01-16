import {PrismaClient, User,Rent} from '@prisma/client'
import { userValidator } from '../../utils/auth/auth.util';
import { filterRent } from 'src/utils/helper/filter';
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
    editRent:async(_,{rentId: rentId,rent:args},context)=>{
        const user:User = await userValidator(context.req);

        const rent = await prisma.rent.update({
            where:{id:rentId,userId:user.id},
            data:{...args}
        });

        const updatedRent = await prisma.rent.findUnique({where:{id:rent.id}});
        if(!updatedRent){
            throw new Error(
                "در بروزرسانی ملک مشکلی بوجود امد!"
            );
        }

        return updatedRent;
    },
    filterRent:async(_,{filter},context)=>{
        const {
            room,
            mortgageFrom = 0,
            mortgageTo,
            rentFrom = 0,
            rentTo,
            buildYearFrom = 0,
            buildYearTo,
            meterageFrom = 0,
            meterageTo,
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

        const rent = await prisma.rent.findMany({
            where:{
                AND:[   
                    {buildYear:{gte:buildYearFrom,...(buildYearTo !== undefined && {lte:buildYearTo})}},
                    {meterage:{gte:meterageFrom,...(meterageTo !== undefined && {lte:meterageTo})}},     
                    {...(mortgageFrom !== undefined && {mortgage:{gte:mortgageFrom}})},
                    {...(mortgageTo !== undefined &&{mortgage:{lte:mortgageTo}})},
                    {...(rentFrom !== undefined &&{rent:{gte:rentFrom}})},
                    {...(rentTo !== undefined &&{rent:{lte:rentTo}})},
                    {...(room !== undefined && { room:{lte:room}})},
                    {type:{in:type}},
                ]                                   
 
            }
        });

        if(rent.length  == 0) throw new Error('ملکی مشابه نیاز های شما یافت نشد!');

        return rent;
    },
    singleRent:async(_,{id})=>{
        const rent = await prisma.rent.findUnique({where:{id}});
        if(!rent){
            throw new Error('آگهی فروش یافت نشد!');
        }else{
            await prisma.rent.update({where:{id},data:{watchCount:{increment:1}}});
        }

        return rent;
    },
    deleteRent:async(_,{id},context)=>{
        const user:User = await userValidator(context.req);

        const rent = await prisma.rent.delete({where:{id,userId:user.id}});
        if(!rent) throw new Error('حذف ملک با خطا مواجه شد!');
        return `آگهی رهن ${rent.title} با موفقیت حذف شد!`;
    },
    highToLowMortgage:async(_,{reverse},context)=>{
        const rents = (await prisma.rent.findMany({})).sort((s1,s2)=>  +s2.mortgage - +s1.mortgage);
       
        if(!rents.length) throw new Error("ملکی برای اجاره در سایت موجود نیست!");

        if(reverse){
            rents.reverse();
        };

        return rents;
    },
    highToLowRent:async(_,{reverse},context)=>{
        const rents = (await prisma.rent.findMany({})).sort((s1,s2)=>  +s2.rent - +s1.rent);
       
        if(!rents.length) throw new Error("ملکی برای اجاره در سایت موجود نیست!");

        if(reverse){
            rents.reverse();
        };

        return rents;
    },
    filteredRent:async(_,{type},context)=>{
        let rents = await prisma.rent.findMany({});
        if(rents.length === 0) throw new Error("آگهی اجاره در سایت ثبت نشده است!");

        const filter = filterRent(rents);
        return filter;
    },
};

export const rentQuery = {
    allRent:async()=>{
        const rents = await prisma.rent.findMany()
        if(rents.length == 0) throw new Error("ملکی در سایت ثبت نشده است!");
        return rents;
    },
    topViewedRents:async()=>{
        const rents = (await prisma.rent.findMany({})).sort((a,b)=>a.watchCount - b.watchCount);
        if(rents.length == 0){
            throw new Error('ملکی در سایت موجود نیست');
        }

        return rents;
    },
    newRents:async()=>{
        const rents = (await prisma.rent.findMany());
        if(rents.length == 0) throw new Error("ملکی در سایت ثبت نشده است!");
        return rents;
    },
}

