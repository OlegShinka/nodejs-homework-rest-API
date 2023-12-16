import * as contactService from "../models/contacts.js";
import { HttpErrors } from "../helpers/Httperrors.js";
import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const contactUpDateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const getAll = async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.getContactById(contactId);
    if (!result) {
      throw HttpErrors(404, `Contact with id ${contactId} not FOUND!`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpErrors(404, "missing required name field");
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpErrors(400, error.message);
    }

    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactUpDateSchema.validate(req.body);
    if (error) {
      throw HttpErrors(400, error.message);
    }

    if (!Object.keys(req.body).length) {
      throw HttpErrors(404, "missing required name field");
    }

    const { contactId } = req.params;
    const result = await contactService.updateContact(contactId, req.body);

    if (!result) {
      throw HttpErrors(404, `Contact with id ${contactId} not FOUND!`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.removeContact(contactId);
    if (!result) {
      throw HttpErrors(404, `Contact with id ${contactId} not FOUND!`);
    }

    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
export { getAll, getById, addContact, updateContact, deleteContact };
