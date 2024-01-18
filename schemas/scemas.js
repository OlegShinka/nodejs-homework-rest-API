import Joi from "joi";
import { subscriptionList } from "../models/Users.js";

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
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userLogSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userUpdateSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionList),
});

const userEmailSchema = Joi.object({
  email: Joi.string().required(),
});

export {
  contactAddSchema,
  contactUpDateSchema,
  contactUpDateFavoriteSchema,
  userRegSchema,
  userLogSchema,
  userUpdateSchema,
  userEmailSchema,
};
