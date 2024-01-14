import { HttpErrors } from "../helpers/Httperrors.js";

//перевірка на пусте поле запиту
export const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body); // перевірка на наявність ключа чз довжину
  if (!length) {
    return next(HttpErrors(400, "missing required name field"));
  }
  next();
};
