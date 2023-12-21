import express from "express";
import * as contactControllers from "../../controllers/contacts-controllers.js";
import { validateBody } from "../../decorators/validateBody.js";
import { contactAddSchema } from "../../schemas/scemas.js";

const router = express.Router();

router.get("/", contactControllers.getAll);

// router.get("/:contactId", contactControllers.getById);

router.post("/", validateBody(contactAddSchema), contactControllers.addContact);

// router.delete("/:contactId", contactControllers.deleteContact);

// router.put("/:contactId", contactControllers.updateContact);

export default router;
