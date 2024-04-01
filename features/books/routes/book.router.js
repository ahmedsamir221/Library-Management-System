// create validation middleware using joi schema
const validator = require("../../../middlewares/validator");
const createBookJoiSchema = require("../joiSchemas/createBook.joiSchema");
const updateBookJoiSchema = require("../joiSchemas/updateBook.joiSchema");
const borrowBookJoiSchema = require("../joiSchemas/borrowBook.joiSchema");
const bookControler = require("../controlers/book.controler");
const borrowingControler = require("../controlers/borrowing.controler");
const express = require("express");
const bookRouter = express.Router();

bookRouter.get("/search", bookControler.search);
bookRouter.post("/:bookId/borrow/:borrowerId", validator(borrowBookJoiSchema), borrowingControler.borrowBook);
bookRouter.post("/:bookId/return/:borrowerId", borrowingControler.returnBook);
bookRouter.get("/", bookControler.getAllBooks);
bookRouter.get("/:id", bookControler.getBookById);
bookRouter.post("/", validator(createBookJoiSchema), bookControler.createBook);
bookRouter.patch("/:id", validator(updateBookJoiSchema), bookControler.updateBook);
bookRouter.delete("/:id", bookControler.deleteBook);

module.exports = bookRouter;
