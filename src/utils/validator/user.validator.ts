import joi from 'joi';

export const userValidator = joi.object({
    email:joi.string().required().message('لطفا ایمیل خود را وارد کنید!').email().message('ایمیل اشتباه است!'),
    password: joi.string()
        .required()
        .message('رمز عبور خود را وارد کنید!')
        .min(8)
        .message('رمز عبور شما نمی تواند کمتر از ۸ کاراکتر باشد!')
        .max(255)
        .message('رمز عبور شما نمی تواند بیش از ۲۵۵ کاراکتر باشد!'),
});