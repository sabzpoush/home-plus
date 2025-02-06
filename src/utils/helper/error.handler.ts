import joi,{ObjectSchema} from 'joi';

export async function ErrorValidation(schema:ObjectSchema,obj:object):Promise<object>{
    try{
        const value = await schema.validateAsync(obj);
        console.log(value);
        return value;
    }catch(err){
        const errorMessage = err.details[0].message;
        throw new Error(errorMessage);
    }
};