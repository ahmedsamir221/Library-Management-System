const validator = require("../../../middlewares/validator");
const createBorrowerJoiSchema = require("../joiSchemas/createBorrower.joiSchema");
const updateBorrowerJoiSchema = require("../joiSchemas/updateBorrower.joiSchema");
const controler = require("../controlers/borrower.controler");
const express = require("express");
const router = express.Router();

router.get("/:id/books", controler.getAllBooksByBorrowerId);
router.get("/", controler.getAllBorrowers);
router.get("/:id", controler.getBorrowerById);
router.post("/", validator(createBorrowerJoiSchema), controler.createBorrower);
router.patch(
  "/:id",
  validator(updateBorrowerJoiSchema),
  controler.updateBorrower
);
router.delete("/:id", controler.deleteBorrower);

module.exports = router;
