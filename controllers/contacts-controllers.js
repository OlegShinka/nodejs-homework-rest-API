// import * as contactService from "../models/contacts.js";
// import { HttpErrors } from "../helpers/Httperrors.js";
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

// const getById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactService.getContactById(contactId);
//     if (!result) {
//       throw HttpErrors(404, `Contact with id ${contactId} not FOUND!`);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

const addContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpErrors(400, "missing required name field");
    }

    // const { error } = contactAddSchema.validate(req.body);

    // if (error) {
    //   throw HttpErrors(400, error.message);
    // }

    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// const updateContact = async (req, res, next) => {
//   try {
//     const { error } = contactUpDateSchema.validate(req.body);
//     if (error) {
//       throw HttpErrors(400, error.message);
//     }

//     if (!Object.keys(req.body).length) {
//       throw HttpErrors(404, "missing field");
//     }

//     const { contactId } = req.params;
//     const result = await contactService.updateContact(contactId, req.body);

//     if (!result) {
//       throw HttpErrors(404, `Contact with id ${contactId} not FOUND!`);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactService.removeContact(contactId);
//     if (!result) {
//       throw HttpErrors(404, `Contact with id ${contactId} not FOUND!`);
//     }

//     res.json({
//       message: "contact deleted",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export {
  getAll,
  addContact,
  // getById, updateContact, deleteContact
};
