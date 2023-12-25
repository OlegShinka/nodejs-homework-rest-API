import User from "../models/Users.js";
import { HttpErrors } from "../helpers/Httperrors.js";

const regUser = async (req, res, next) => {
  const { email } = req.body;
  const newUser = await User.create(req.body);

  res.json({
    email: newUser.email,
    password: newUser.password,
  });
};

const logUser = async (req, res, next) => {
  const { email } = req.body;
};

export { regUser, logUser };
