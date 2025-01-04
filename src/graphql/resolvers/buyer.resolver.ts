import { PrismaClient, User } from '@prisma/client';
import { userValidator } from '../../utils/auth/auth.util';
const prisma = new PrismaClient();

export const buyerResolver = {
    submitBuyer:async(_,{buyer:args},context)=>{
        const user:User = await userValidator(context.req);
        
        if (["Rent", "EcoRent"].includes(args.type.toString())) {
            args.price = null;
        }
        const buyer = await prisma.buyer.create({data:{...args,user:{connect:{id:user.id}}}});
        if(!buyer){
            throw new Error('در ثبت آگهی خرید شما مشکلی بوجودامد!');
        }

        return buyer;
    },
    editBuyer:async(_,{buyerId,buyer:args},context)=>{
        const user:User = await userValidator(context.req);

        const buyer = await prisma.buyer.update({
            where:{id:buyerId,userId:user.id},
            data:{...args}
        });

        const updatedBuyer = await prisma.buyer.findUnique({where:{id:buyer.id}});
        if(!updatedBuyer){
            throw new Error(
                "در بروزرسانی ملک مشکلی بوجود امد!"
            );
        }

        return updatedBuyer;
    },
    singleBuyer:async(_,{id})=>{
        const buyer = await prisma.buyer.findUnique({where:{id}});
        if(!buyer){
            throw new Error('آگهی فروش یافت نشد!');
        }else{
            await prisma.buyer.update({where:{id},data:{watchCount:{increment:1}}});
        }

        return buyer;
    },
    deleteBuyer:async(_,{id},context)=>{
        const user:User = await userValidator(context.req);

        const buyer = await prisma.buyer.delete({where:{id,userId:user.id}});
        if(!buyer) throw new Error('حذف ملک با خطا مواجه شد!');
        return `آگهی خرید ${buyer.title} با موفقیت حذف شد!`;
    },
    highToLowBuyers:async(_,{reverse},context)=>{
        const buyers = (await prisma.buyer.findMany({})).sort((s1,s2)=>  +s2.mortgage - +s1.mortgage);
       
        if(!buyers.length) throw new Error("ملکی برای اجاره در سایت موجود نیست!");

        if(reverse){
            buyers.reverse();
        };

        return buyers;
    }
};

export const buyerQuery = {
    allBuyer:async()=>{
        const buyers = await prisma.buyer.findMany();
        if(buyers.length == 0) throw new Error("آگهی خریدی فعلا نیست!");
        return buyers;
    }
};