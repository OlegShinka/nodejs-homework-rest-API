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

export { contactAddSchema, contactUpDateSchema };
