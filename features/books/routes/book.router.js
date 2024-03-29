const controler = require("../controlers/book.controler");
const express = require("express");
const router = express.Router();

router.get("/search", controler.search);
router.get("/", controler.getAllBooks);
router.get("/:id", controler.getBookById);
router.post("/", controler.createBook);
router.put("/:id", controler.updateBook);
router.delete("/:id", controler.deleteBook);

module.exports = router;
