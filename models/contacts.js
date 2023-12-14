import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");
console.log("PathContacts", contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  const listContacts = JSON.parse(data);
  return listContacts;
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
