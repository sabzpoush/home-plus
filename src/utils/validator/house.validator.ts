import joi from 'joi';

export const houseValidator = joi.object({
    title: joi.string()
        .required()
        .min(3)
        .max(25)
        .messages({
            'string.base': 'عنوان ملک باید یک رشته متن باشد!',
            'string.empty': 'عنوان ملک نمی تواند خالی باشد!',
            'string.min': 'عنوان ملک نمی تواند کمتر از سه حرف باشد!',
            'string.max': 'عنوان ملک نمی تواند بیشتر از ۲۵ حرف باشد!',
            'any.required': 'عنوان ملک الزامی است!',
        }),
    owner: joi.string()
        .min(3)
        .max(40)
        .messages({
            'string.base': 'نام مالک یا فروشنده باید یک رشته متن باشد!',
            'string.empty': 'نام مالک یا فروشنده نمی تواند خالی باشد!',
            'string.min': 'نام مالک یا فروشنده نمی تواند کمتر از سه حرف باشد!',
            'string.max': 'نام مالک یا فروشنده نمی تواند بیشتر از ۴۰ حرف باشد!',
        }),
    mortagage: joi.number()
        .min(0)
        .messages({
            'number.base': 'نرخ رهن باید یک عدد باشد!',
            'number.min': 'نرخ رهن نمی تواند کمتر از صفر باشد!',
        }),
    rent: joi.number()
        .min(0)
        .messages({
            'number.base': 'اجاره باید یک عدد باشد!',
            'number.min': 'اجاره نمی تواند کمتر از صفر باشد!',
        }),
    price: joi.number()
        .messages({
            'number.base': 'قیمت باید یک عدد باشد!',
        }),
    phone: joi.string()
        .length(11)
        .messages({
            'string.base': 'شماره تلفن باید یک رشته متن باشد!',
            'string.empty': 'شماره تلفن نمی تواند خالی باشد!',
            'string.length': 'شماره تلفن باید ۱۱ رقمی باشد!',
            'any.required': 'شماره تلفن الزامی است!',
        }),
    address: joi.string()
        .messages({
            'string.base': 'آدرس باید یک رشته متن باشد!',
        }),
    detail: joi.string()
        .optional()
        .messages({
            'string.base': 'جزئیات باید یک رشته متن باشد!',
        }),
    fromMeter: joi.number()
        .min(0)
        .optional()
        .messages({
            'number.base': 'متراژ اولیه باید یک عدد باشد!',
            'number.min': 'متراژ اولیه نمی تواند کمتر از صفر باشد!',
        }),
    toMeter: joi.number()
        .when('fromMeter', {
            is: joi.exist(),
            then: joi.required(),
            otherwise: joi.forbidden(),
        })
        .messages({
            'number.base': 'متراژ ثانویه باید یک عدد باشد!',
            'any.required': 'متراژ ثانویه الزامی است!',
        }),
    room: joi.number()
        .min(0)
        .max(32)
        .optional()
        .messages({
            'number.base': 'تعداد اتاق باید یک عدد باشد!',
            'number.min': 'تعداد اتاق نمی تواند کمتر از صفر باشد!',
            'number.max': 'تعداد اتاق نمی تواند بیشتر از ۳۲ باشد!',
        }),
    fromBuildYear: joi.number()
        .min(1300)
        .max(1500)
        .allow(joi.number().min(1972).max(2040))
        .optional()
        .messages({
            'number.base': 'سال ساخت اولیه باید یک عدد باشد!',
            'number.min': 'سال ساخت اولیه نمی تواند کمتر از ۱۳۰۰ باشد!',
            'number.max': 'سال ساخت اولیه نمی تواند بیشتر از ۱۵۰۰ باشد!',
            'any.only': 'سال ساخت اولیه باید بین ۱۹۷۲ و ۲۰۴۰ باشد!',
        }),
    toBuildYear: joi.number()
        .min(1300)
        .max(1500)
        .allow(joi.number().min(1972).max(2040))
        .when('fromBuildYear', {
            is: joi.exist(),
            then: joi.required(),
            otherwise: joi.forbidden(),
        })
        .messages({
            'number.base': 'سال ساخت ثانویه باید یک عدد باشد!',
            'number.min': 'سال ساخت ثانویه نمی تواند کمتر از ۱۳۰۰ باشد!',
            'number.max': 'سال ساخت ثانویه نمی تواند بیشتر از ۱۵۰۰ باشد!',
            'any.only': 'سال ساخت ثانویه باید بین ۱۹۷۲ و ۲۰۴۰ باشد!',
            'any.required': 'سال ساخت ثانویه الزامی است!',
        }),
    floor: joi.number()
        .min(0)
        .max(32)
        .optional()
        .messages({
            'number.base': 'طبقه باید یک عدد باشد!',
            'number.min': 'طبقه نمی تواند کمتر از صفر باشد!',
            'number.max': 'طبقه نمی تواند بیشتر از ۳۲ باشد!',
        }),
    countFloor: joi.number()
        .min(0)
        .max(32)
        .optional()
        .messages({
            'number.base': 'تعداد طبقات باید یک عدد باشد!',
            'number.min': 'تعداد طبقات نمی تواند کمتر از صفر باشد!',
            'number.max': 'تعداد طبقات نمی تواند بیشتر از ۳۲ باشد!',
        }),
    elvator: joi.boolean()
        .optional()
        .messages({
            'boolean.base': 'آسانسور باید یک مقدار بولین باشد!',
        }),
    parking: joi.boolean()
        .optional()
        .messages({
            'boolean.base': 'پارکینگ باید یک مقدار بولین باشد!',
        }),
    warehouse: joi.boolean()
        .optional()
        .messages({
            'boolean.base': 'انباری باید یک مقدار بولین باشد!',
        }),
    tag: joi.array()
        .items(joi.string().max(24).min(3))
        .messages({
            'array.base': 'تگ‌ها باید یک آرایه باشند!',
            'string.min': 'هر تگ نمی تواند کمتر از سه حرف باشد!',
            'string.max': 'هر تگ نمی تواند بیشتر از ۲۴ حرف باشد!',
        }),
    type: joi.string()
        .valid('Eco', 'Land', 'Apartment', 'Vila', 'Pilot', 'Basement')
        .required()
        .messages({
            'string.base': 'نوع ملک باید یک رشته متن باشد!',
            'any.only': 'نوع ملک باید یکی از مقادیر معتبر باشد!',
            'any.required': 'نوع ملک الزامی است!',
        }),
    category: joi.string()
        .valid('Asker', 'Buyer', 'Rent', 'Sale')
        .required()
        .messages({
            'string.base': 'نوع دسته بندی باید یک رشته متن باشد!',
            'any.only': 'نوع دسته بندی باید یکی از مقادیر معتبر باشد!',
            'any.required': 'نوع دسته بندی الزامی است!',
        }),
}).custom((value, helpers) => {
    if (value.fromMeter > value.toMeter) {
        return helpers.message({ message: 'متر اولیه نمی تواند کمتر از متر ثانویه باشد!' });
    }
    if (value.fromBuildYear > value.toBuildYear) {
        return helpers.message({ message: 'سال ساخت اولیه نمی تواند بیشتر از سال ساخت ثانویه باشد!' });
    }
    if (value.price && (value.rent || value.mortagage)) {
        return helpers.message({ message: 'یا قیمت یا اجاره و رهن را فقط وارد کنید!' });
    }
    return value;
});


export const houseFilterValidator = joi.object({
    title: joi.string()
        .optional()
        .messages({
            'string.base': 'عنوان باید یک رشته متن باشد!',
        }),
    type: joi.string()
        .valid('Eco', 'Land', 'Apartment', 'Vila', 'Pilot', 'Basement')
        .optional()
        .messages({
            'string.base': 'نوع ملک باید یک رشته متن باشد!',
            'any.only': 'نوع ملک باید یکی از مقادیر معتبر باشد!',
        }),
    category: joi.string()
        .valid('Asker', 'Buyer', 'Rent', 'Sale')
        .optional()
        .messages({
            'string.base': 'نوع دسته بندی باید یک رشته متن باشد!',
            'any.only': 'نوع دسته بندی باید یکی از مقادیر معتبر باشد!',
        }),
    priceFrom: joi.number()
        .messages({
            'number.base': 'حداقل قیمت باید یک عدد باشد!',
        }),
    priceTo: joi.number()
        .when('priceFrom', {
            is: joi.exist(),
            then: joi.required(),
            otherwise: joi.forbidden(),
        })
        .messages({
            'number.base': 'حداکثر قیمت باید یک عدد باشد!',
            'any.required': 'حداکثر قیمت الزامی است!',
        }),
    mortgageFrom: joi.number()
        .messages({
            'number.base': 'حداقل رهن باید یک عدد باشد!',
        }),
    mortgageTo: joi.number()
        .when('mortgageFrom', {
            is: joi.exist(),
            then: joi.required(),
            otherwise: joi.forbidden(),
        })
        .messages({
            'number.base': 'حداکثر رهن باید یک عدد باشد!',
            'any.required': 'حداکثر رهن الزامی است!',
        }),
    rentFrom: joi.number()
        .messages({
            'number.base': 'حداقل اجاره باید یک عدد باشد!',
        }),
    rentTo: joi.number()
        .when('rentFrom', {
            is: joi.exist(),
            then: joi.required(),
            otherwise: joi.forbidden(),
        })
        .messages({
            'number.base': 'حداکثر اجاره باید یک عدد باشد!',
            'any.required': 'حداکثر اجاره الزامی است!',
        }),
    buildYearFrom: joi.number()
        .messages({
            'number.base': 'حداقل سال ساخت باید یک عدد باشد!',
        }),
    buildYearTo: joi.number()
        .when('buildYearFrom', {
            is: joi.exist(),
            then: joi.required(),
            otherwise: joi.forbidden(),
        })
        .messages({
            'number.base': 'حداکثر سال ساخت باید یک عدد باشد!',
            'any.required': 'حداکثر سال ساخت الزامی است!',
        }),
    meterageFrom: joi.number()
        .messages({
            'number.base': 'حداقل متراژ باید یک عدد باشد!',
        }),
    meterageTo: joi.number()
        .when('meterageFrom', {
            is: joi.exist(),
            then: joi.required(),
            otherwise: joi.forbidden(),
        })
        .messages({
            'number.base': 'حداکثر متراژ باید یک عدد باشد!',
            'any.required': 'حداکثر متراژ الزامی است!',
        }),
    room: joi.number()
        .messages({
            'number.base': 'تعداد اتاق باید یک عدد باشد!',
        }),
}).custom((value, helpers) => {
    if (value.priceFrom > value.priceTo) {
        return helpers.message({ message: 'حداقل قیمت نمی تواند بیشتر از حداکثر قیمت باشد!' });
    }
    if (value.rentFrom > value.rentTo) {
        return helpers.message({ message: 'حداقل اجاره نمی تواند بیشتر از حداکثر اجاره باشد!' });
    }
    if (value.mortgageFrom > value.mortgageTo) {
        return helpers.message({ message: 'حداقل رهن نمی تواند بیشتر از حداکثر رهن باشد!' });
    }
    if (value.meterageFrom > value.meterageTo) {
        return helpers.message({ message: 'حداقل متراژ نمی تواند بیشتر از حداکثر متراژ باشد!' });
    }
    if (value.buildYearFrom > value.buildYearTo) {
        return helpers.message({ message: 'حداقل سال ساخت نمی تواند بیشتر از حداکثر سال ساخت باشد!' });
    }
    return value;
});