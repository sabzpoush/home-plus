import joi from 'joi';

export const rentSchema = joi.object({
    title: joi.string()
        .required()
        .min(3)
        .max(25),
    owner: joi.string()
        .min(3)
        .max(30),
    mortagage: joi.number(),
    rent:joi.number(),
    phone:joi.string()
        .required(),
    address: joi.string(),
    detail: joi.string(),
    meterage:joi.number(),
    room: joi.number(),
    buildYear: joi.number(),
    floor: joi.number(),
    countFloor: joi.number(),
    parking: joi.boolean(),
    warehouse: joi.boolean(),
    tag: joi.array().items(joi.string().max(24).min(3)),
    type: joi.string().valid('Rent').required()
})