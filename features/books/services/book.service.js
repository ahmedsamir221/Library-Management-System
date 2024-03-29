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

  return oldBook.update(newBook);
};

module.exports.deleteBook = async (id) => {
  const book = await Book.findByPk(id);

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

module.exports.getByISBN = (isbn) => {
  return Book.findOne({
    where: {
      isbn,
    },
  });
};
