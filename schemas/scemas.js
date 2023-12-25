import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"title" must be exist`,
  }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactUpDateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const contactUpDateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const userRegSchema = Joi.object({
  // name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userLogSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export {
  contactAddSchema,
  contactUpDateSchema,
  contactUpDateFavoriteSchema,
  userRegSchema,
  userLogSchema,
};
