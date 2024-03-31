const validator = require("../../../middlewares/validator");
const createBookJoiSchema = require("../joiSchemas/createBook.joiSchema");
const updateBookJoiSchema = require("../joiSchemas/updateBook.joiSchema");
const borrowBookJoiSchema = require("../joiSchemas/borrowBook.joiSchema");
const bookControler = require("../controlers/book.controler");
const borrowingControler = require("../controlers/borrowing.controler");
const authMiddleware = require("../../../middlewares/auth");
const express = require("express");
const router = express.Router();

router.get("/search", bookControler.search);
router.post( "/:bookId/borrow/:borrowerId", validator(borrowBookJoiSchema), borrowingControler.borrowBook);
router.post("/:bookId/return/:borrowerId", borrowingControler.returnBook);
router.get("/", bookControler.getAllBooks);
router.get("/:id", bookControler.getBookById);
router.post("/", validator(createBookJoiSchema), bookControler.createBook);
router.patch("/:id", validator(updateBookJoiSchema), bookControler.updateBook);
router.delete("/:id", bookControler.deleteBook);

module.exports = router;
