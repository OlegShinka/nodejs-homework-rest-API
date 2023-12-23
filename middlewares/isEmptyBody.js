import { HttpErrors } from "../helpers/Httperrors.js";

export const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpErrors(400, "missing required name field"));
  }
  next();
};

export const isEmptyBodyFavorite = (req, res, next) => {
  const { favorite } = req.body;

  if (!favorite) {
    return next(HttpErrors(400, "missing field favorite"));
  }
  next();
};
