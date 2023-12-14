import * as contactService from "../models/contacts.js";

const getAll = async (req, res, next) => {
  const result = await contactService.listContacts();
  res.json(result);
  // res.json({ message: "template message" });
};

export { getAll };
