const Joi = require('@hapi/joi');


const regValidation = (data) =>{
    const validateSchema = {
        name: Joi.string()
            .min(2),
        email: Joi.string()
            .min(6)
            .required().email(),
        password: Joi.string()
            .min(6)
            .required()
    };

    return Joi.validate(data,validateSchema)
};

const loginValidation = (data) =>{
    const validateSchema = {
        name: Joi.string()
            .min(2),
        email: Joi.string()
            .min(6)
            .required().email(),
        password: Joi.string()
            .min(6)
            .required()
    };

    return Joi.validate(data,validateSchema)
};

module.exports.regValidation = regValidation;
module.exports.loginValidation = loginValidation;

