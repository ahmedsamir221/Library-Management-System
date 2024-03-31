const express = require("express");
const { bookRouter } = require("../features/books/index");
const { borrowerRouter } = require("../features/borrowers/index");
const { reportingRouter } = require("../features/reporting/index");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/books", bookRouter);
  app.use("/borrowers", borrowerRouter);
  app.use("/reporting", reportingRouter);
  //app.use("/api/auth", auth);
  app.use(error);
};
