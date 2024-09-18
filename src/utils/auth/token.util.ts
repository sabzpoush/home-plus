import jwt from 'jsonwebtoken';

const key = process.env.SECRET_KEY;

export function createToken(email:String):String{
    const token:String = jwt.sign({email},key,{
        expiresIn:'10D'
    });
    return token;
}