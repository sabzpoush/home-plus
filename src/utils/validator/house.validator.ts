import joi from 'joi';

export const houseValidator = joi.object({
    title: joi.string()
        .required()
        .min(3)
        .max(25),
    owner: joi.string()
        .min(3)
        .max(40),
    mortagage: joi.number().min(0),
    rent:joi.number().min(0),
    price:joi.number(),
    phone:joi.string()
        .length(11)
        .allow(joi.string().length(8))
        .required(),
    address: joi.string(),
    detail: joi.string().optional(),
    fromMeter:joi.number().min(0).optional(),
    toMeter: joi.number().when('fromMeter',{
        is: joi.exist(),
        then: joi.required(),
        otherwise: joi.forbidden(),
    }),
    room: joi.number().min(0).max(32),
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
          }),
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
    type: joi.string().valid('Eco','Land','Apartment','Vila','Pilot','Basement'),
    categoryType: joi.string().valid('Asker','Buyer','Rent','Sale'),
    priceFrom:joi.number(),
    priceTo:joi.number().when('priceFrom',{
        is:joi.exist(),
        then:joi.required(),
        otherwise: joi.forbidden(),
    }),
    mortgageFrom:joi.number(),
    mortgageTo:joi.number().when('mortgageFrom',{
        is:joi.exist(),
        then:joi.required(),
        otherwise: joi.forbidden(),
    }),
    rentFrom:joi.number(),
    rentTo:joi.number().when('rentFrom',{
        is:joi.exist(),
        then:joi.required(),
        otherwise: joi.forbidden(),
    }),
    buildYearFrom:joi.number(),
    buildYearTo:joi.number().when('buildYearFrom',{
        is:joi.exist(),
        then:joi.required(),
        otherwise: joi.forbidden(),
    }),
    meterageFrom:joi.number(),
    metarageTo:joi.number().when('meterageFrom',{
        is:joi.exist(),
        then:joi.required(),
        otherwise: joi.forbidden(),
    }),
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