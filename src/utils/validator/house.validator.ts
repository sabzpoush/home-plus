import joi from 'joi';

export const houseValidator = joi.object({
    title: joi.string()
    .required()
    .min(3)
    .max(25)
    .messages({
        'string.min': 'عنوان ملک نمی تواند کمتر از سه حرف باشد!',
        'string.max': 'عنوان ملک نمی تواند بیشتر از ۲۵ حرف باشد!',
        'any.required': 'عنوان ملک الزامی است!',
    }),
    owner: joi.string()
        .min(3)
        .max(40)
        .message('نام مالک یا فرشنده نمی تواند کمتر از سه حرف باشد!'),
    mortagage: joi.number().min(0).message('لطفا نرخ رهن را صحیح وارد کنید!'),
    rent:joi.number().min(0),
    price:joi.number(),
    phone:joi.string()
        .length(11)
        .allow(joi.string().length(8))
        .required().message('شماره تلفن وارد شده صحیح نیست!'),
    address: joi.string(),
    detail: joi.string().optional(),
    fromMeter:joi.number().min(0).optional().message('کمتر از صفر نمی توانید وارد کنید!'),
    toMeter: joi.number().when('fromMeter',{
        is: joi.exist(),
        then: joi.required(),
        otherwise: joi.forbidden(),
    }).message('شروع متراژ را وارد نکرده اید!'),
    room: joi.number().min(0).max(32).optional().message('بیش از 32 اتاق نمی توانید در نظر بگیرید!'),
    fromBuildYear: joi.number()
        .min(1300)
        .max(1500)
        .allow(joi.number().min(1972).max(2040))
        .optional(),
    toBuildYear: joi.number()
        .min(1300)
        .max(1500)
        .allow(joi.number().min(1972).max(2040)).when('fromMeter', {
            is: joi.exist(),
            then: joi.required(),
            otherwise: joi.forbidden(), // Disallow `fieldB` if `fieldA` does not exist
          }).message('شروع سال ساخت را وارد نکرده اید!'),
    floor: joi.number().min(0).max(32).optional(),
    countFloor: joi.number().min(0).max(32).optional(),
    elvator:joi.boolean().optional(),
    parking: joi.boolean().optional(),
    warehouse: joi.boolean().optional(),
    tag: joi.array().items(joi.string().max(24).min(3)),
    type: joi.string().valid('Eco','Land','Apartment','Vila','Pilot','Basement').required(),
    categoryType: joi.string().valid('Asker','Buyer','Rent','Sale').required(),

}).custom((value, helpers) => {
    if (value.fromMeter > value.toMeter) {
      return helpers.message({message:'متر اولیه نمی تواند کمتر از متر ثانویه باشد!'});
    }
    if (value.fromBuildYear > value.toBuildYear) {
        return helpers.message({message:'سال ساخت اولیه نمی تواند بیشتر از سال ساخت ثانویه باشد!'});
    }
    if (value.price && (value.rent || value.mortagage)){
        return helpers.message({message:'یا قیمت یا اجاره و رهن را فقط وارد کنید!'});
    }


    return value;
});


export const houseFilterValidator = joi.object({
    title:joi.string().optional(),
    type: joi.string().valid('Eco','Land','Apartment','Vila','Pilot','Basement').optional(),
    categoryType: joi.string().valid('Asker','Buyer','Rent','Sale').optional(),
    priceFrom:joi.number(),
    priceTo:joi.number().when('priceFrom',{
        is:joi.exist(),
        then:joi.required(),
        otherwise: joi.forbidden(),
    }).message('شروع قیمت را وارد نکرده اید!'),
    mortgageFrom:joi.number(),
    mortgageTo:joi.number().when('mortgageFrom',{
        is:joi.exist(),
        then:joi.required(),
        otherwise: joi.forbidden(),
    }).message('شروع قیمت رهن را وارد نکرده اید!'),
    rentFrom:joi.number(),
    rentTo:joi.number().when('rentFrom',{
        is:joi.exist(),
        then:joi.required(),
        otherwise: joi.forbidden(),
    }).message('شروع قیمت اجاره را وارد نکرده اید!'),
    buildYearFrom:joi.number(),
    buildYearTo:joi.number().when('buildYearFrom',{
        is:joi.exist(),
        then:joi.required(),
        otherwise: joi.forbidden(),
    }).message('شروع سال را وارد نکرده اید!'),
    meterageFrom:joi.number(),
    metarageTo:joi.number().when('meterageFrom',{
        is:joi.exist(),
        then:joi.required(),
        otherwise: joi.forbidden(),
    }).message('شروع متراژ را وارد نکرده اید!'),
    room:joi.number(),
}).custom((value, helpers) => {
    if (value.priceFrom > value.priceTo) {
        return helpers.message({message:'شروع قیمت نمی تواند از سقف قیمت کمتر باشد!'});
    }
    if (value.rentFrom > value.rentTo) {
        return helpers.message({message:'شروع اجار نمی تواند از سقف اجار کمتر باشد!'});
    }
    if (value.mortgageFrom > value.mortgageTo) {
        return helpers.message({message:'شروع رهن نمی تواند از سقف رهن کمتر باشد!'});
    }

    if (value.meterageFrom > value.metarageTo) {
      return helpers.message({message:'متر اولیه نمی تواند کمتر از متر ثانویه باشد!'});
    }
    if (value.buildYearFrom > value.buildYearTo) {
        return helpers.message({message:'سال ساخت اولیه نمی تواند بیشتر از سال ساخت ثانویه باشد!'});
    }

    return value;
});;