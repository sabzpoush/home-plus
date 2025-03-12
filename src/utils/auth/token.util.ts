import jwt from 'jsonwebtoken';

const key = process.env.SECRET_KEY;

export function createToken(email:String):String{
    return jwt.sign({email},key,{
        expiresIn:'10D'
    });
    
}