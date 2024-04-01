const express = require("express");
const { bookRouter } = require("../features/books/index");
const { borrowerRouter } = require("../features/borrowers/index");
const { reportingRouter } = require("../features/reporting/index");
const { userRouter } = require("../features/users/index");
const { loginRouter } = require("../features/auth/index");
const error = require("../middlewares/error");
const authMiddleware = require("../middlewares/auth");

module.exports = function (app) {
  // to return 400 status code incase invalid JSON
  app.use(
    express.json({
      strict: false, 
      verify: (req, res, buf) => {
        try {
          JSON.parse(buf);
        } catch (err) {
          return res.status(400).json({ error: "Invalid JSON" });
        }
      },
    })
  );

  app.use("/books", authMiddleware, bookRouter);
  app.use("/borrowers", authMiddleware, borrowerRouter);
  app.use("/reporting", authMiddleware, reportingRouter);
  app.use("/users", userRouter);
  app.use("/auth", loginRouter);
  app.use(error);
};
