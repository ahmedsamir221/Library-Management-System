const validator = require("../../../middlewares/validator");
const createBookJoiSchema = require("../joiSchemas/createBook.joiSchema");
const updateBookJoiSchema = require("../joiSchemas/updateBook.joiSchema");
const controler = require("../controlers/book.controler");
const express = require("express");
const router = express.Router();

router.get("/search", controler.search);
router.get("/", controler.getAllBooks);
router.get("/:id", controler.getBookById);
router.post("/", validator(createBookJoiSchema), controler.createBook);
router.patch("/:id", validator(updateBookJoiSchema), controler.updateBook);
router.delete("/:id", controler.deleteBook);

module.exports = router;
