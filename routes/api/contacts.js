import express from "express";
import * as contactControllers from "../../controllers/contacts-controllers.js";
const router = express.Router();

router.get("/", contactControllers.getAll);

router.get("/:contactId", contactControllers.getById);

router.post("/", contactControllers.addContact);

router.delete("/:contactId", contactControllers.deleteContact);

router.put("/:contactId", contactControllers.updateContact);

export default router;
