import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
const contactsPath = path.resolve("models", "contacts.json");

async function upDate(allContacts) {
  return fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  const listContacts = JSON.parse(data);
  return listContacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await upDate(allContacts);
  return result;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  allContacts.push(newContact);
  await upDate(allContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { ...allContacts[index], ...body };
  await upDate(allContacts);
  return allContacts[index];
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
