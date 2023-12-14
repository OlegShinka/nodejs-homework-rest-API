import express from "express";
import logger from "morgan";
import cors from "cors";
import router from "./routes/api/contacts.js";
// import contacts from "./models/contacts.js";

// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// const contacts = require("./models/contacts.json");
// const contactsRouter = require("./routes/api/contacts");

const app = express(); // app - веб-сервер створення

// app.get("/", (req, res) => {
//   res.send("Hello !");
// });
// app.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });
// app.get("/contact", (req, res) => {
//   res.json(contacts);
// });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", router); // якщо прийде запит з цієї адр шукай її в routes

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// module.exports = app;
export default app;
