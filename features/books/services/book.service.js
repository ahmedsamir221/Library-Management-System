const { Book } = require("../models/book.model");

module.exports.getAllBooks = () => {
  return Book.findAll();
};

module.exports.getBookById = (id) => {
  return Book.findByPk(id);
};

module.exports.createBook = (book) => {
  return Book.create(book);
};

module.exports.updateBook = async (id, newBook) => {
  const oldBook = await Book.findByPk(id);
  if (!oldBook) return oldBook;
  return oldBook.update(newBook);
};

module.exports.deleteBook = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) return book;
  return book.destroy();
};

module.exports.searchByTitle = (title) => {
  return Book.findAll({
    where: {
      title,
    },
  });
};

module.exports.searchByAuthor = (author) => {
  return Book.findAll({
    where: {
      author,
    },
  });
};

module.exports.searchByISBN = (isbn) => {
  return Book.findAll({
    where: {
      isbn,
    },
  });
};
