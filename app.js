import express from "express";
import logger from "morgan";
import cors from "cors";
import router from "./routes/api/contacts.js";
import routerAuth from "./routes/api/auth.js";
import dotenv from "dotenv";

const app = express(); // app - веб-сервер створення

dotenv.config(); // бере змінні з .env додає в налаш PC

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // дає можливість отримувати тіло запиту
app.use(express.static("public")); //

app.use("/api/contacts", router); // якщо прийде запит з цієї адр шукай її в routes
app.use("/api/users", routerAuth);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});
// повертає повідомленя помилки
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
