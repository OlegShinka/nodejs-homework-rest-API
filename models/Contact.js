// import { required } from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post("save", handleSaveError); //операція save у методі, яка викличе хук після невдалого збереження

const Contact = model("contact", contactSchema);

export default Contact;
