import { isValidObjectId } from "mongoose";
import { HttpErrors } from "../helpers/Httperrors.js";

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpErrors(404, ` ${contactId} not valid id`));
  }
  next();
};
