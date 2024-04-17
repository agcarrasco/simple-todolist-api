require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const v1Router = require("./routes/v1");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, PORT } = process.env;

const initializeDb = async () => {
  const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authsource=admin`;
  await mongoose.connect(uri);
};

const app = express();
const port = PORT || 3000;

(async () => {
  try {
    await initializeDb();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.get("/", (req, res) => {
      res.json({ message: "Simple Todo List API server is running" });
    });

    app.use("/api/v1", v1Router);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
