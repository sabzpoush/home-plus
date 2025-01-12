import joi from 'joi';

export const saleSchema = joi.object({
    title: joi.string()
        .required()
        .min(3)
        .max(25),
    sellerName: joi.string()
        .min(3)
        .max(30),
    price: joi.number(),
    phone:joi.string()
        .required(),
    address: joi.string(),
    detail: joi.string(),
    meterage:joi.number(),
    room: joi.number(),
    buildYear: joi.number().min(1300).max(1500).allow(joi.number().min(1972).max(2040)),
    floor: joi.number(),
    countFloor: joi.number(),
    elvator:joi.boolean(),
    parking: joi.boolean(),
    warehouse: joi.boolean(),
    tag: joi.array().items(joi.string().max(24).min(3)),
  //  type: joi.string().required()
});

export const saleFilterSchema = joi.object({
    priceFrom:joi.number(),
    priceTo:joi.number(),
    buildYearFrom:joi.number(),
    buildYearTo:joi.number(),
    meterageFrom:joi.number(),
    metarageTo:joi.number(),
   // type,
    room:joi.number(),
}).custom((value, helpers) => {
    if (value.priceFrom > value.priceTo) {
        return helpers.message({message:'شروع قیمت نمی تواند از سقف قیمت کمتر باشد!'});
      }
    if (value.meterageFrom > value.metarageTo) {
      return helpers.message({message:'متر اولیه نمی تواند کمتر از متر ثانویه باشد!'});
    }
    if (value.buildYearFrom > value.buildYearTo) {
        return helpers.message({message:'سال ساخت اولیه نمی تواند بیشتر از سال ساخت ثانویه باشد!'});
    }

    return value;
});;