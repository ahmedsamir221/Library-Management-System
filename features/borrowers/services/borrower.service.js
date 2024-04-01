const { Op } = require("sequelize");
const { Borrower } = require("../models/borrower.model");
const config = require("config");
const {isValidPositaveInteger} = require('../../../utils/commonValidation')

const getAllBorrowers = function (pageNumber) {
  const limit = config.get("pageSize");
  const offset = (pageNumber - 1) * limit;

  return Borrower.findAll({ order: [["id"]], offset, limit });
};

const getBorrowerById = function (id) {
  if (!isValidPositaveInteger(id)) return null;

  return Borrower.findByPk(id);
};

const createBorrower = function (borrower, transaction) {
  return Borrower.create(borrower, { transaction });
};

const updateBorrower = async function (id, newBorrower, transaction) {
  if (!isValidPositaveInteger(id)) return null;

  const [affectedRows] = await Borrower.update(newBorrower, {
    where: { id },
    transaction,
  });

  if (!affectedRows) return null;

  return Borrower.findByPk(id, { transaction });
};

const deleteBorrower = async function (id, transaction) {
  if (!isValidPositaveInteger(id)) return null;

  const affectedRows = await Borrower.destroy({ where: { id }, transaction });

  if (!affectedRows) return null;

  return {};
};

const getBorrowerByEmail = function (email) {
  return Borrower.findOne({ where: { email } });
};

const getCurrentlyBorrowedBooksByBorrowerId = async function (id) {
  if (!isValidPositaveInteger(id)) return null;
  
  const borrower = await Borrower.findByPk(id);
  if (!borrower) return null;

  const books = await borrower.getBooks({
    where: {
      "$BorrowedBook.return_date$": {
        [Op.is]: null,
      },
    },
  });

  return books.map((book) => {
    let newBook = book.toJSON();
    delete newBook["BorrowedBook"];
    return newBook;
  });
};

module.exports = {
  getAllBorrowers,
  getBorrowerById,
  createBorrower,
  updateBorrower,
  deleteBorrower,
  getBorrowerByEmail,
  getCurrentlyBorrowedBooksByBorrowerId,
};
