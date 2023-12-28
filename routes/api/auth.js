import express from "express";
import { validateBody } from "../../decorators/validateBody.js";
import { userLogSchema, userRegSchema } from "../../schemas/scemas.js";
import * as authControllers from "../../controllers/auth-controllers.js";

const routerAuth = express.Router();

routerAuth.post(
  "/register",
  validateBody(userRegSchema),
  authControllers.regUser
);

routerAuth.post("/login", validateBody(userLogSchema), authControllers.logUser);

export default routerAuth;
