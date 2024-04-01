// create validation middleware using joi schema
const validator = require("../../../middlewares/validator");
const createBorrowerJoiSchema = require("../joiSchemas/createBorrower.joiSchema");
const updateBorrowerJoiSchema = require("../joiSchemas/updateBorrower.joiSchema");
const borrowerControler = require("../controlers/borrower.controler");
const express = require("express");
const borrowerRouter = express.Router();

borrowerRouter.get("/:id/books", borrowerControler.getAllBooksByBorrowerId);
borrowerRouter.get("/", borrowerControler.getAllBorrowers);
borrowerRouter.get("/:id", borrowerControler.getBorrowerById);
borrowerRouter.post("/", validator(createBorrowerJoiSchema), borrowerControler.createBorrower);
borrowerRouter.patch("/:id", validator(updateBorrowerJoiSchema), borrowerControler.updateBorrower);
borrowerRouter.delete("/:id", borrowerControler.deleteBorrower);

module.exports = borrowerRouter;
