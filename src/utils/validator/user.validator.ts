import joi from 'joi';

export const userValidator = joi.object({
    email:joi.string().email(),
    password: joi.string().min(8),
});