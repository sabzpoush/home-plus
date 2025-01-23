import {House, PrismaClient, User} from '@prisma/client'
const prisma = new PrismaClient();
import {createToken} from '../../utils/auth/token.util';
import bcrypt from 'bcrypt';
import {hashPassword} from '../../utils/auth/hashPassword.util';
import { userTokenValidator, userValidator, verifyUserToken } from '../../utils/auth/auth.util';
import fs from 'fs';
import path from 'path';


export const userResolver = {
    login:async(_,args)=>{
        try{
            const {email,password} = args;
            const user = await prisma.user.findUnique({where:{email}});
            if(!user){
                throw new Error('کاربری با این شماره تلفن یافت نشد!');
            }
            const isValidPassword:boolean = bcrypt.compareSync(password,user.password);
            if(!isValidPassword){
                throw new Error('نام کاربری یا رمز عبور اشتباه است!')
            }
            const token:string = createToken(email) as string;
            const changeUserToken = await prisma.user.update({where:{id:user.id},data:{token}});
            return {token,user:changeUserToken};
        }catch(err){
            throw new Error(`خطای ناشناخته! ${err}`);
        }
    },
    register:async(_,args)=>{
        try{
            const {email}  = args;
            const token:string = createToken(email) as string;
            const hashedPassword = hashPassword(args.password);
            const checkUser = await prisma.user.findUnique({where:{email}});
            if(checkUser){
                throw new Error('این ایمیل قبلا ثبت شده!');
            }
            const user = await prisma.user.create({data:{...args,password:hashedPassword,token}});
    
            if(!user){
                throw new Error("در ثبت نام کاربر مشکلی بوجود آمد!");
            }
    
            return {token:user.token,user};
        }catch(err){
            throw new Error(`مشکلی ناشناخته بودجود امد! \n ${err}`,);
        }
    },
    editUser:async(_,args,context)=>{
        try{
            const user:User = await userValidator(context.req);

            const editProfile:User = await prisma.user.update({where:{id:user.id},data:{...args}});
            if(!editProfile){
                throw new Error('در ویرایش کاربر مشکلی رخ داد!');
            }
    
            return editProfile;
        }catch(err){
            throw new Error(err.toString());
        }
    },
    uploadFile:async(_,{file},context)=>{
        //const user:User = await userValidator(context.req);
        const { createReadStream, filename, mimetype, encoding } = await file;

        // Define upload directory
        const uploadDir = path.join(__dirname ,'../', 'uploads');
  
        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }
  
        // Save the file to the server
        const filePath = path.join(uploadDir, filename);
        const stream = createReadStream();
        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(filePath);
          stream.pipe(writeStream);
          writeStream.on('finish', resolve);
          writeStream.on('error', (error) => {
            fs.unlinkSync(filePath);
            reject(error);
          });
        });
  
        return { filename, mimetype, encoding };
    },
    addLikedProperty:async(_,{id},context)=>{
        const user:User = await userValidator(context.req);
        const property = await prisma.house.findUnique({where:{id}});

        if(!property){
            throw new Error('ملکی با این شناسه موجود نیست!');
        }
        const userLiked:string[] = user.Liked;
        const existProp = userLiked.find((like)=> like == id);
        if(existProp) throw new Error('این ملک قبلا به علاقه مندی ها افزوده شده!');
        userLiked.push(property.id);
        const addLikePropToUser = await prisma.user.update({where:{id:user.id},data:{Liked:userLiked}});
        if(!addLikePropToUser){
            throw new Error('در افزودن ملک به علاقه مندی ها مشکلی رخ داد!');
        }
        return {message:`ملک ${property.title} به علاقه مندی ها افزوده شد!`};
    },
    removeLikedProperty:async(_,{id},context)=>{
        const user:User = await userValidator(context.req);

        const userLiked:string[] = user.Liked;
        const updatedProp = userLiked.filter((like)=> like != id);

        const removeLikeProp = await prisma.user.update({where:{id:user.id},data:{Liked:updatedProp}});
        if(!removeLikeProp){
            throw new Error('در حذف ملک از علاقه مندی مشکلی رخ داد!');
        }
        return {message:'ملک انتخابی از علاقه مندی ها حذف گردید!'};
    },
    checkUserToken:async(_,{},context)=>{
        const tokenStat = await verifyUserToken(context.req);
        const userResult = await userTokenValidator(context.req);
        const user = JSON.stringify(userResult);
        return {user,tokenStat};
    },
};


export const userQueryResolver = {
    userPropertySubmited:async(_,{},context)=>{
        try{
            const user:User = await userValidator(context.req);

            const house = await prisma.house.findMany({where:{userId:user.id}});
          
            if(!house) throw new Error('بارگذاری اطلاعات شما با خطا مواجه شد!');
            if(!house.length) throw new Error('بارگذاری اطلاعات شما با خطا مواجه شد!');
    
            return house;
        }catch(err){
            throw new Error(err.toString());
        }
    }, 
    likeProperty:async(_,{},context)=>{
        try{
            const user:User = await userValidator(context.req);

            const house = await prisma.house.findMany({where:{id:{in:user.Liked}}});
    
            if(!house.length){
                throw new Error('ملکی را هنوز به عنوان علاقه مندی اضافه نکرده اید!');
            };
    
            return house;
        }catch(err){
            throw new Error(err.toString());
        }
    }
}