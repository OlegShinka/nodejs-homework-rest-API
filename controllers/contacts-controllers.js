import { HttpErrors } from "../helpers/Httperrors.js";
// import { contactAddSchema, contactUpDateSchema } from "../schemas/scemas.js";

import Contact from "../models/Contact.js";

// import { validateBody } from "../decorators/validateBody.js";

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { _id: contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOne({ contactId, owner });
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
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner }); // додаєм в контакти поле owner з id юзера що робить приватні запити
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { _id: contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate(
      { contactId, owner },
      req.body
    );
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
    const { _id: contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndDelete({ contactId, owner });
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
