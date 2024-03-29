const express = require("express");
const { bookRouter } = require("../features/books/index");
const error = require('../middlewares/error')

module.exports = function (app) {
  app.use(express.json());
  app.use("/books", bookRouter);
  //app.use("/api/auth", auth);
  app.use(error);
};
