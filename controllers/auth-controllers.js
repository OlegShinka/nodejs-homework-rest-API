import User from "../models/Users.js";
import { HttpErrors } from "../helpers/Httperrors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const { SECRET_KEY } = process.env;

const regUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return next(HttpErrors(409, "Email in use"));
    // return res.status(409).json({
    //   message: "Email in use",
    // });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const logUser = async (req, res, next) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email }); //перевірка наявності юзера з таким email-ом

  if (!user) {
    return next(HttpErrors(401, "Email or password is wrong"));
  }

  const passwordCompare = await bcrypt.compare(password, user.password); // перевірка валідності паролю
  if (!passwordCompare) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" }); // генерація токена

  res.json({
    token: token,
    user: { email: user.email, subscription: user.subscription },
  });
};

export { regUser, logUser };
