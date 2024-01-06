import { HttpErrors } from "../helpers/Httperrors.js";
// import { contactAddSchema, contactUpDateSchema } from "../schemas/scemas.js";

import Contact from "../models/Contact.js";
import User from "../models/Users.js";

// import { validateBody } from "../decorators/validateBody.js";

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    //додали 3-ій аргумент в мет. find для пагінації
    const result = await Contact.find({ owner /*favorite: true */ }, "-__v", {
      skip,
      limit,
    }).populate("owner", "email"); //бере знач ключа email з обєкту owner дл більшої інформативності
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params);
    const { _id } = req.user;
    const result = await Contact.findOne({ _id: contactId, owner: _id });
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
    const { contactId } = req.params;
    const { _id: owner } = req.user;

    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
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
