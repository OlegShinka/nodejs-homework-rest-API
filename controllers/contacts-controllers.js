import { HttpErrors } from "../helpers/Httperrors.js";
// import { contactAddSchema, contactUpDateSchema } from "../schemas/scemas.js";

import Contact from "../models/Contact.js";

// import { validateBody } from "../decorators/validateBody.js";

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
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
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);

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
    const result = await Contact.findByIdAndDelete(contactId);
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

export { getAll, addContact, getById, updateContact, deleteContact };
