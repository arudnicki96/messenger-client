const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");
const PORT = 4000;

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const http = require("http").Server(app);
const cors = require("cors");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

http.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
