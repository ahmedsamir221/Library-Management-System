const { Op } = require("sequelize");
const { Borrower } = require("../models/borrower.model");
const { Book } = require("../../books/index");

module.exports.getAllBorrowers = () => {
  return Borrower.findAll();
};

module.exports.getBorrowerById = (id) => {
  return Borrower.findByPk(id);
};

module.exports.createBorrower = (borrower) => {
  return Borrower.create(borrower);
};

module.exports.updateBorrower = async (id, newBorrower) => {
  const borrower = await Borrower.findByPk(id);
  if (!borrower) return borrower;

  return borrower.update(newBorrower);
};

module.exports.deleteBorrower = async (id) => {
  const borrower = await Borrower.findByPk(id);
  if (!borrower) return borrower;

  const deletedBorrower = borrower;
  await borrower.destroy();
  return deletedBorrower;
};

module.exports.getBorrowerByEmail = (email) => {
  return Borrower.findOne({ where: { email } });
};

module.exports.getAllBooksByBorrowerId = async (id) => {
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
