import mongoose from "mongoose";
import app from "./app.js";
// OLd040529p
const DB_HOST =
  "mongodb+srv://OlShinka:OLd040529p@cluster0.quxs8kw.mongodb.net/my-contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
