import express from "express";
import * as contactControllers from "../../controllers/contacts-controllers.js";
import { validateBody } from "../../decorators/validateBody.js";
import authenticate from "../../middlewares/authenticate.js";
import {
  contactAddSchema,
  contactUpDateSchema,
  contactUpDateFavoriteSchema,
} from "../../schemas/scemas.js";

import { isEmptyBody } from "../../middlewares/isEmptyBody.js";

import { isValidId } from "../../middlewares/isValidId.js";

const router = express.Router();

router.use(authenticate); //не важливо який роут, перевір наявність валідного токена

router.get("/", contactControllers.getAll);

router.get("/:contactId", isValidId, contactControllers.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactControllers.addContact
);

router.delete("/:contactId", isValidId, contactControllers.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactUpDateSchema),
  contactControllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(contactUpDateFavoriteSchema),
  contactControllers.updateContact
);

export default router;
