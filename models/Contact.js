// import { required } from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, addUpdateSetting } from "./hooks.js";
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
//хуки:
contactSchema.post("save", handleSaveError); //операція save у методі, яка викличе хук після невдалого збереження

contactSchema.pre("findOneAndUpdate", addUpdateSetting); // хук який оновить також і у відповіді перед оновленням

contactSchema.post("findOneAndUpdate", handleSaveError); //операція оновлення у методі, яка викличе хук після невдалого оновлення

const Contact = model("contact", contactSchema);

export default Contact;
