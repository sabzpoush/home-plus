import {PrismaClient, User} from '@prisma/client'
const prisma = new PrismaClient();
import {createToken} from '../../utils/auth/token.util';
import bcrypt from 'bcrypt';
import { userValidator } from '../../utils/auth/auth.util';
import { rent } from '../types/rent.type';

export const userResolver = {
    login:async(_,args)=>{
        const {email} = args;
        const user = await prisma.user.findUnique({where:{email}});
        if(!user){
            throw new Error('کاربری با این شماره تلفن یافت نشد!');
        }
        const token:string = createToken(user.email) as string;
        const userWithNewToken = await prisma.user.update({where:{id:user.id},data:{token}});
        return {token:token,user:userWithNewToken};
    },
    register:async(_,args)=>{
        const {email}  = args;
        const token = createToken(email);
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(args.password,salt);
        const user = await prisma.user.create({data:{...args,password:hashPassword,token}});

        if(!user){
            throw new Error("در ثبت نام کاربر مشکلی بوجود آمد!");
        }

        return {token:user.token,user};
    },
}

export const userQueryResolver = {
    userPropertySubmited:async(_,{},context)=>{
        const user:User = await userValidator(context.req);

        const sales = await prisma.sale.findMany({where:{userId:user.id}});
        const rents = await prisma.rent.findMany({where:{userId:user.id}});
        const buyers = await prisma.buyer.findMany({where:{userId:user.id}});
        if(!sales || !rents || !buyers) throw new Error('بارگذاری اطلاعات شما با خطا مواجه شد!');

        return {sales,rents,buyers};
    }
}