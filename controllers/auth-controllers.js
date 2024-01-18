import User from "../models/Users.js";
import { HttpErrors } from "../helpers/Httperrors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import "dotenv/config";
import gravatar from "gravatar";
import sendMail from "../helpers/sendEmail.js";
import { nanoid } from "nanoid";
import { error } from "console";

const { SECRET_KEY, BASE_URL } = process.env;

// const nodemailerConfig = {
//   host: "smtp.ukr.net",
//   port: 465, //25 465 2525
//   secure: true,
//   auth: {
//     user: UKR_NET_FROM,
//     pass: UKR_NET_PASSWORD,
//   },
// };
// const transport = nodemailer.createTransport(nodemailerConfig);
// const email = {
//   from: UKR_NET_FROM,
//   to: "gemimic421@rentaen.com",
//   subject: "test email",
//   html: "<strong> Very jussy email</strong>",
// };
// transport
//   .sendMail(email)
//   .then(() => console.log("email successfull"))
//   .catch((error) => console.log(error.message));
// //

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
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
    verificationToken,
    // додаємо в базу поле з посилання на аватарку
    avatarURL,
  });

  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target = "_blank" href = "${BASE_URL}/api/users/verify/${verificationToken}">Click for verify email</a>`,
  };

  // надсилання листа підтвердження регістрації
  await sendMail(verifyEmail);

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
    avatarURL,
  });
};

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    return next(HttpErrors(401, "Email not found or already verify."));
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification email success",
  });
};

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  //якщо юзера з таким ємейлом немає
  if (!user) {
    return next(HttpErrors(400, "Email not found"));
  }
  //якщо в обєкті user ключ verify:true, тобто юзер вже підтвердив свій email
  if (user.verify) {
    return next(HttpErrors(400, "Verification has already been passed"));
  }

  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target = "_blank" href = "${BASE_URL}/api/users/verify/${user.verificationToken}">Click for verify email</a>`,
  };

  await sendMail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

const logUser = async (req, res, next) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email }); //перевірка наявності юзера з таким email-ом

  if (!user) {
    return next(HttpErrors(401, "Email or password is wrong"));
  }

  //перевірка чи новий юзер підтвердив свій ємейл
  if (!user.verify) {
    return next(HttpErrors(401, "Email not verify!"));
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
  verify,
  resendVerifyEmail,
};
