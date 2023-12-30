import express from "express";
import { validateBody } from "../../decorators/validateBody.js";
import { userLogSchema, userRegSchema } from "../../schemas/scemas.js";
import * as authControllers from "../../controllers/auth-controllers.js";
import authenticate from "../../middlewares/authenticate.js";

const routerAuth = express.Router();

routerAuth.use(authenticate); //не важливо який роут, перевір наявність валідного токена

routerAuth.post(
  "/register",
  validateBody(userRegSchema),
  authControllers.regUser
);

routerAuth.post("/login", validateBody(userLogSchema), authControllers.logUser);

routerAuth.get(
  "/current",
  validateBody(userLogSchema),
  authControllers.currentUser
);

export default routerAuth;
