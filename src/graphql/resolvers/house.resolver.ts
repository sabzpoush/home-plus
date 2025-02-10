import {PrismaClient,User} from '@prisma/client'
const prisma = new PrismaClient();
import {userTokenValidator, userValidator} from '../../utils/auth/auth.util';
import { filterHouseByCategory, houseFilter } from '../../utils/helper/filter';
import {houseSubmitValidator,houseEditValidator,houseFilterValidator, validateID, houseOrderValidator} from '../../utils/validator/house.validator';
import {ErrorValidation} from '../../utils/helper/error.handler';

export const houseMutation = {
    submitHouse:async(_,{house:args},context)=>{
    //    try{
            const user:User = await userValidator(context.req);
            await ErrorValidation(houseSubmitValidator,args);
            const house = await prisma.house.create({data:{userId:user.id,...args}});
            if(!house){
                throw new Error("در ثبت این اگهی مشکلی رخ داد!");
            }
    
            return house;
        // }catch(err){
        //     throw new Error(err);
        // }
    },
    editHouse:async(_,{houseId,house:args},context)=>{
        // try{
            const user:User = await userValidator(context.req);
            await ErrorValidation(houseEditValidator,{houseId,...args});
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
    //     }catch(err){
    //         throw new Error('ثبت تغییرات ملک با مشکل مواجه شد!');
    //     }
    },
    filterHouseByParameters:async(_,{filter},context)=>{
        // try{
            const user:User = await userTokenValidator(context.req);
            const filterValidatedValue = await ErrorValidation(houseFilterValidator,filter);
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
                    "Villa",
                    "Eco",
                ],
            } = filterValidatedValue as any;
     
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
        // }catch(err){
        //     throw new Error('یافتن ملک با خطا مواجه شد!');
        // }
    },
    singleHouse:async(_,{houseId})=>{
        // try{
            await ErrorValidation(validateID,{id:houseId});
            const house = await prisma.house.findUnique({where:{id:houseId}});
            if(!house){
                throw new Error('آگهی ملکی یافت نشد!');
            }else{
                await prisma.house.update({where:{id:houseId},data:{watchCount:{increment:1}}});
            }
    
            return house;
        // }catch(err){
        //     throw new Error('بارگذاری ملک با خطا مواجه شد!');
        // }
    },
    deleteHouse:async(_,{id: houseId},context)=>{
        // try{
            const user:User = await userValidator(context.req);
            await ErrorValidation(validateID,{id: houseId});
    
            const house = await prisma.house.delete({where:{id: houseId,userId:user.id}});
            if(!house) throw new Error('حذف ملک با خطا مواجه شد!');
            return `ملک ${house.title} با موفقیت حذف شد!`;
        // }catch(err){
        //     throw new Error('خذف ملک با خطا مواجه شد!');
        // }
    },
    orderHouse:async(_,{category,type},context)=>{
        // try{
            await ErrorValidation(houseOrderValidator,{category,type})
            let newestHouse = (await prisma.house.findMany({
                where:{AND:[
                    {...(category !== undefined && {category})},
                    {...(type !== undefined && {type})}
                ]}
            })).sort((house1,house2)=> +house2.submitedAt - +house1.submitedAt);
            const oldestHouse = [...newestHouse].reverse();
    
            const filter = filterHouseByCategory(newestHouse,category);
            return {
                newestHouse,
                oldestHouse,
                ...filter,
            };
        // }catch(err){
        //     throw new Error('دسته بندی کردن ملک ها با خطا مواجه شد!');
        // }
        
    },
    searchProperty:async(_,{title},context)=>{
        // try{
            const user:User = await userTokenValidator(context.req);
            const house = await prisma.house.findMany({where:{...(user !== null && {userId:user.id})}});
            const regex = new RegExp(`^.*${title}.*$`);
            const houses = house.filter((prop)=>{
                return regex.test(prop.title);
            });
            
            return houses;
        // }catch(err){
        //     throw new Error('یافتن ملک با خطا مواجه شد!');
        // }
    },
};

export const houseQuery = {
    allHouse:async()=>{
        try{
            const house = await prisma.house.findMany();
            if(house.length == 0) throw new Error('ملکی در سایت ثبت نشده است!');
            
            return house;
        }catch(err){
            throw new Error('در بارگذاری تمام خانه ها مشکلی بوجود آمد!');
        }
    },
    topViewedHouse:async()=>{
        try{
            const house = (await prisma.house.findMany({})).sort((a,b)=>a.watchCount - b.watchCount);
            if(house.length == 0) throw new Error('ملکی در سایت موجود نیست');
    
            return house;
        }catch(err){
            throw new Error('یافتن برترین ملک ها با خطا مواجه شد!');
        }
    },
}
