import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();
import {createToken} from '../../utils/auth/token.util';

export const userResolver = {
    login:async(_,args)=>{
        const {phone} = args;
        const user = await prisma.user.findUnique({where:{phone}});
        if(!user){
            throw new Error('کاربری با این شماره تلفن یافت نشد!');
        }

        return {token:user.token,user};
    },
    register:async(_,args)=>{
        const phone  = args.phone;
        const token = createToken(phone);
        const user = await prisma.user.create({data:{...args,token}});

        if(!user){
            throw new Error("در ثبت نام کاربر مشکلی بوجود آمد!");
        }

        return {token:user.token,user};
    },
    test:(parent,args)=>{
        console.log(args.value);
        return{ value:String(args.value)};
    }
}