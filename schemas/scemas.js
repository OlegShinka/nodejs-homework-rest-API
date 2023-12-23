import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"title" must be exist`,
  }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactUpDateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const contactUpDateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export { contactAddSchema, contactUpDateSchema, contactUpDateFavoriteSchema };
