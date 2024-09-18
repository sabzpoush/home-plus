import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();
import {createToken} from '../../utils/auth/token.util';
import bcrypt from 'bcrypt';

export const userResolver = {
    login:async(_,args)=>{
        const {email} = args;
        const user = await prisma.user.findUnique({where:{email}});
        if(!user){
            throw new Error('کاربری با این شماره تلفن یافت نشد!');
        }

        return {token:user.token,user};
    },
    register:async(_,args)=>{
        console.log(args);
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
    test:(parent,args)=>{
        console.log(args.value);
        return{ value:String(args.value)};
    }
}