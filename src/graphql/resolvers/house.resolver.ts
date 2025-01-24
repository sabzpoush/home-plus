import {PrismaClient,User} from '@prisma/client'
const prisma = new PrismaClient();
import {userTokenValidator, userValidator} from '../../utils/auth/auth.util';
import { houseFilter } from '../../utils/helper/filter';


export const houseMutation = {
    submitHouse:async(_,{house:args},context)=>{
        const user:User = await userValidator(context.req);
        
        const house = await prisma.house.create({data:{userId:user.id,...args}});
        if(!house){
            throw new Error("در ثبت این اگهی مشکلی رخ داد!");
        }

        return house;
    },
    editHouse:async(_,{houseId,house:args},context)=>{
        const user:User = await userValidator(context.req);

        const house = await prisma.house.update({
            where:{id:houseId,userId:user.id},
            data:{...args}
        });

        const updatedHouse = await prisma.house.findUnique({where:{id:house.id}});
        if(!updatedHouse){
            throw new Error(
                "در بروزرسانی ملک مشکلی بوجود امد!"
            );
        }

        return updatedHouse;
    },
    filterHouseByParameters:async(_,{filter},context)=>{
        const user:User = await userTokenValidator(context.req);
        console.log(user);
        const {
            title,
            room,
            priceFrom,
            priceTo,
            buildYearFrom,
            buildYearTo,
            meterageFrom,
            meterageTo,
            category=["Rent","Asker","Buyer","Sale"],
            type=[
                "Apartment",
                "Pilot",
                "Basement",
                "Land",
                "Resident",
                "Eco",
            ],
        } = filter;
 
        let house = await prisma.house.findMany({
            where:{
                AND:[
                    {...(user !== null && {userId:user.id})},
                    {category:{in:category}},
                    {...(room !== undefined && { room:{gte:room}})},
                    {...(priceFrom !== undefined &&{price:{gte:priceFrom}})},
                    {...(priceTo !== undefined &&{price:{lte:priceTo}})},
                    {...(buildYearFrom !== undefined && {buildYear:{gte:buildYearFrom}})},
                    {...(buildYearTo !== undefined && {buildYear:{lte:buildYearTo}})},
                    {...(meterageFrom !== undefined && {meterage:{gte:meterageFrom}})},
                    {...(meterageTo !== undefined && {meterage:{lte:meterageTo}})},
                    {type:{in:type}},
                ]
            }
        });

        if(house.length  == 0) throw new Error('ملکی مشابه نیاز های شما یافت نشد!');

        if(title){
            const regex = new RegExp(`^.*${title}.*$`);
            house = house.filter((prop)=>{
                return regex.test(prop.title);
            });
        }

        return house;
    },
    singleHouse:async(_,{houseId})=>{
        const house = await prisma.house.findUnique({where:{id:houseId}});
        if(!house){
            throw new Error('آگهی فروش یافت نشد!');
        }else{
            await prisma.house.update({where:{id:houseId},data:{watchCount:{increment:1}}});
        }

        return house;
    },
    deleteHouse:async(_,{id},context)=>{
        const user:User = await userValidator(context.req);

        const house = await prisma.house.delete({where:{id,userId:user.id}});
        if(!house) throw new Error('حذف ملک با خطا مواجه شد!');
        return `ملک ${house.title} با موفقیت حذف شد!`;
    },
    orderHouse:async(_,{category,type},context)=>{
        let house = await prisma.house.findMany({
            where:{AND:[
                {...(category !== undefined && {category})},
                {...(type !== undefined && {type})}
            ]}
        });

        const filter = houseFilter(house);
        return filter;
    },
    searchProperty:async(_,{title},context)=>{
        const house = await prisma.house.findMany();
        const regex = new RegExp(`^.*${title}.*$`);
        const houses = house.filter((prop)=>{
            return regex.test(prop.title);
        });
        
        return houses;
    },
};

export const houseQuery = {
    allHouse:async()=>{
        const house = await prisma.house.findMany();
        if(house.length == 0) throw new Error('ملکی در سایت ثبت نشده است!');
        return house;
    },
    topViewedHouse:async()=>{
        const house = (await prisma.house.findMany({})).sort((a,b)=>a.watchCount - b.watchCount);
        if(house.length == 0){
            throw new Error('ملکی در سایت موجود نیست');
        }

        return house;
    },
}
