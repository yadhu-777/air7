const Joi = require("joi");

const ListingValidation = Joi.object({
    listings:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required(),
        image:Joi.string().allow(null,""),
        location:Joi.string().required(),
        country:Joi.string().required()
    })
});

module.exports= ListingValidation;