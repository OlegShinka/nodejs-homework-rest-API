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

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    // email: user.email,
    // subscription: user.subscription,
    email,
    subscription,
  });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "logout success",
  });
};

export { regUser, logUser, currentUser, signOut };
