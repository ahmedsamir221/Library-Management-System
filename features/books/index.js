const { Book } = require("./models/book.model");
const { BorrowedBook } = require("./models/borrowedBook.model");
const bookRouter = require("./routes/book.router");


module.exports = {
  Book,
  bookRouter,
  BorrowedBook,
};
