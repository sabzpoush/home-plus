import joi from 'joi';

export const rentSchema = joi.object({
    title: joi.string()
        .required()
        .min(3)
        .max(25),
    owner: joi.string()
        .min(3)
        .max(30),
    mortagage: joi.number().min(0),
    rent:joi.number().min(0),
    price:joi.number(),
    phone:joi.string()
        .length(11)
        .allow(joi.string().length(8))
        .required(),
    address: joi.string(),
    detail: joi.string(),
    fromMeter:joi.number().min(0),
    toMeter: joi.number(),
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
    floor: joi.number().min(0).max(32),
    countFloor: joi.number().min(0).max(32),
    elvator:joi.boolean(),
    parking: joi.boolean(),
    warehouse: joi.boolean(),
    tag: joi.array().items(joi.string().max(24).min(3)),
    type: joi.string().valid('Asker','Buyer').required(),

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