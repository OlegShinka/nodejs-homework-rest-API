import { contactAddSchema } from "../schemas/scemas.js";
import { HttpErrors } from "../helpers/Httperrors.js";

export const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw HttpErrors(400, error.message);
    }
    next();
  };
  return func;
};
