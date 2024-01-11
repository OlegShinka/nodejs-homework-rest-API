import multer from "multer";
import path from "path";
import { HttpErrors } from "../helpers/Httperrors.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};
const fileFilter = (req, file, callback) => {
  const extention = req.originalname.split(".").pop();
  if (extention === "exe") {
    callback(HttpErrors(400, ".exe not valid extention"));
  }
};

const upload = multer({
  storage,
  limits,
  //fileFilter,
});
export { upload };
