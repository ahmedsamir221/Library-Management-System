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
  const book = await Book.findByPk(id);
  if (!book) return book;
  return book.update(newBook);
};

module.exports.deleteBook = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) return book;

  const deletedBook = book;
  await book.destroy();
  return deletedBook;
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

module.exports.getByISBN = (isbn) => {
  return Book.findOne({
    where: {
      isbn,
    },
  });
};
