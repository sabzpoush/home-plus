import joi from 'joi';

export const userValidator = joi.object({
    email: joi.string()
        .required()
        .email()
        .messages({
            'any.required': 'لطفا ایمیل خود را وارد کنید!',
            'string.empty': 'لطفا ایمیل خود را وارد کنید!',
            'string.email': 'ایمیل اشتباه است!'
        }),
    password: joi.string()
        .required()
        .min(8)
        .max(255)
        .messages({
            'any.required': 'رمز عبور خود را وارد کنید!',
            'string.empty': 'رمز عبور خود را وارد کنید!',
            'string.min': 'رمز عبور شما نمی تواند کمتر از ۸ کاراکتر باشد!',
            'string.max': 'رمز عبور شما نمی تواند بیش از ۲۵۵ کاراکتر باشد!'
        })
});