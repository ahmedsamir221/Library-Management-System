const { Book } = require("../models/book.model");
const config = require("config");
const {isValidPositaveInteger} = require('../../../utils/commonValidation')

const getAllBooks = function (pageNumber) {
  const limit = config.get("pageSize");
  const offset = (pageNumber - 1) * limit;

  return Book.findAll({ order: [["id"]], offset, limit });
};

const getBookById = function (id) {
  if (!isValidPositaveInteger(id)) return null;

  return Book.findByPk(id);
};

const createBook = function (book, transaction) {
  return Book.create(book, { transaction });
};

const updateBook = async function (id, newBook, transaction) {
  if (!isValidPositaveInteger(id)) return null;

  const [affectedRows] = await Book.update(newBook, {
    where: { id },
    transaction,
  });

  if (!affectedRows) return null;

  return Book.findByPk(id, { transaction });
};

const deleteBook = async function (id, transaction) {
  if (!isValidPositaveInteger(id)) return null;
  
  const affectedRows = await Book.destroy({ where: { id }, transaction });

  if (!affectedRows) return null;

  return {};
};

const searchBooksByTitle = function (title) {
  return Book.findAll({
    where: {
      title,
    },
  });
};

const searchBooksByAuthor = function (author) {
  return Book.findAll({
    where: {
      author,
    },
  });
};

const searchBooksByISBN = function (isbn) {
  return Book.findAll({
    where: {
      isbn,
    },
  });
};

const getBookByISBN = function (isbn) {
  return Book.findOne({
    where: {
      isbn,
    },
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooksByTitle,
  searchBooksByAuthor,
  searchBooksByISBN,
  getBookByISBN,
};
