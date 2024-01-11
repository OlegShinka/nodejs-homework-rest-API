import User from "../models/Users.js";
import { HttpErrors } from "../helpers/Httperrors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import "dotenv/config";
import gravatar from "gravatar";
const { SECRET_KEY } = process.env;

const regUser = async (req, res, next) => {
  const { email, password } = req.body;

  //пошук такого юзера
  const user = await User.findOne({ email });
  //якщо немає юзера то викидаємо помилку
  if (user) {
    return next(HttpErrors(409, "Email in use"));
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
    // додаємо в базу поле з посилання на аватарку
    avatarURL,
  });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
    avatarURL,
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
  console.log("req.user :>> ", req.user);
  res.json({
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

const upDateSubscription = async (req, res, next) => {
  try {
    const { ownerId } = req.params;
    const { subscription } = req.user;

    console.log("req.user :>> ", req.user);

    const result = await User.findOneAndUpdate(
      { _id: ownerId, subscription },
      req.body
    );

    if (!result) {
      throw HttpErrors(404, `User with ${ownerId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

//шлях до аватару
const avatarPath = path.resolve("public", "avatars");

const upDateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;

  const resultUpload = path.join(avatarPath, filename);
  //перенос аватару з тимч папки до папки public
  await fs.rename(tempUpload, resultUpload);
  //посилання на аватарку чз об шляху та назви файлу
  const avatarURL = path.join("avatars", filename);
  await User.findOneAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export {
  regUser,
  logUser,
  currentUser,
  signOut,
  upDateSubscription,
  upDateAvatar,
};
