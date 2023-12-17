import joi from 'joi';

const signupSchemaValidation = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().min(6).required().trim(),
    confirmPassword: joi.ref('password'),
    name: joi.string().required().trim(),
    point: joi.number().required(),
    addresss: joi.string().required().trim(),
});

const loginSchemaValidation = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().min(6).required().trim(),
});

const categoriesSchemaValidation = joi.object({
    name: joi.string().required().trim(),
});

const storesSchemaValidation = joi.object({
    name: joi.string().required().trim(),
    category_id: joi.number().required(),
    addresss: joi.string().required().trim(),
});

const menusSchemaValidation = joi.object({
    name: joi.string().required().trim(),
    price: joi.number().required().default(0),
});

const cartSchemaValidation = joi.object({});

const reviewsSchemaValidation = joi.object({
    comment: joi.string().required().trim(),
    star: joi.string().required().trim(),
});

const ordersSchemaValidation = joi.object({});

export { signupSchemaValidation, loginSchemaValidation, categoriesSchemaValidation, storesSchemaValidation, menusSchemaValidation, cartSchemaValidation, ordersSchemaValidation, reviewsSchemaValidation };
