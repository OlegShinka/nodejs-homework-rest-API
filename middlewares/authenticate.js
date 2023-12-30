import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import { HttpErrors } from "../helpers/Httperrors.js";
import User from "../models/Users.js";
import "dotenv/config";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpErrors(401, "Authorization not define!"));
  }
  //перевірка чи є в рядку хедер слово bearer та токен
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpErrors(401, "not Bearer"));
  }
  //перевірка токена на валідність
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    // перевірка чи є такий Юзер
    const user = await User.findById(id);
    if (!user) {
      return next(HttpErrors(401, " User not define"));
    }
    req.user = user; //додаєм до обєкту user поле з даними користувача, який робить приватні запити
    next();
  } catch (error) {
    next(HttpErrors(401, "token not valid"));
  }
};
export default authenticate;
