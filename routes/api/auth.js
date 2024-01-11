import express from "express";
import { validateBody } from "../../decorators/validateBody.js";
import {
  userLogSchema,
  userRegSchema,
  userUpdateSchema,
} from "../../schemas/scemas.js";
import * as authControllers from "../../controllers/auth-controllers.js";
import authenticate from "../../middlewares/authenticate.js";
import { upload } from "../../middlewares/upload.js";

const routerAuth = express.Router();

routerAuth.post(
  "/register",
  upload.single("avatarURL"),
  validateBody(userRegSchema),
  authControllers.regUser
);

routerAuth.post(
  "/login",
  upload.single("avatarURL"),
  validateBody(userLogSchema),
  authControllers.logUser
);

routerAuth.get("/current", authenticate, authControllers.currentUser);

routerAuth.post("/logout", authenticate, authControllers.signOut);

routerAuth.patch(
  "/:ownerId/subscription",
  authenticate,
  validateBody(userUpdateSchema),
  authControllers.upDateSubscription
);

routerAuth.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.upDateAvatar
);

export default routerAuth;
