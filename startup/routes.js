const express = require("express");
const { bookRouter } = require("../features/books/index");
const { borrowerRouter } = require("../features/borrowers/index");
const { reportingRouter } = require("../features/reporting/index");
const { userRouter } = require("../features/users/index");
const { authRouter } = require("../features/auth/index");
const error = require("../middlewares/error");
const authMiddleware = require("../middlewares/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/books", authMiddleware, bookRouter);
  app.use("/borrowers", authMiddleware, borrowerRouter);
  app.use("/reporting", authMiddleware, reportingRouter);
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
  app.use(error);
};
