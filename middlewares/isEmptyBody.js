import { HttpErrors } from "../helpers/Httperrors.js";

export const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpErrors(400, "missing required name field"));
  }
  next();
};
