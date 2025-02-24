import joi from 'joi';

export const userValidator = joi.object({
    email: joi
      .string()
      .required()
      .email()
      .messages({
        'string.empty': 'لطفا ایمیل خود را وارد کنید!',
        'string.email': 'ایمیل اشتباه است!'
      }),
  
    password: joi
      .string()
      .required()
      .min(8)
      .max(255)
      .messages({
        'string.empty': 'رمز عبور خود را وارد کنید!',
        'string.min': 'رمز عبور شما نمی تواند کمتر از ۸ کاراکتر باشد!',
        'string.max': 'رمز عبور شما نمی تواند بیش از ۲۵۵ کاراکتر باشد!'
      })
  });