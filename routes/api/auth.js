import express from "express";
import { validateBody } from "../../decorators/validateBody.js";
import { userRegSchema } from "../../schemas/scemas.js";
import * as authControllers from "../../controllers/auth-controllers.js";

const routerAuth = express.Router();

routerAuth.post(
  "/register",
  validateBody(userRegSchema),
  authControllers.regUser
);

export default routerAuth;
