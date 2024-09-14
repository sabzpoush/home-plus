import jwt from 'jsonwebtoken';

const key = process.env.SECRET_KEY;

export function createToken(phone:String):String{
    const token:String = jwt.sign({phone},key,{
        expiresIn:'10D'
    });
    return token;
}