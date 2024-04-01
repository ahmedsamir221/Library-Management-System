const { Op } = require("sequelize");
const { Book } = require("../models/book.model");
const { BorrowedBook } = require("../models/borrowedBook.model");
const { isValidPositaveInteger } = require("../../../utils/commonValidation");

const borrowBook = async function (bookId, borrowerId, dueDate, transaction) {
  if (!isValidPositaveInteger(bookId) || !isValidPositaveInteger(borrowerId))
    return null;

  const [result] = await Book.decrement(
    { quantity: 1 },
    { where: { id: bookId, quantity: { [Op.gt]: 0 } }, transaction }
  );
  // check if the quantity is decremented, maybe another transaction updated the record and the quantity became zero
  const affectedRows = result[1];
  if (!affectedRows) return null;

  const borrowedBook = await BorrowedBook.create(
    {
      BookId: bookId,
      BorrowerId: borrowerId,
      due_date: dueDate,
    },
    { transaction }
  );

  return borrowedBook;
};

const returnBook = async function (bookId, borrowerId, transaction) {
  if (!isValidPositaveInteger(bookId) || !isValidPositaveInteger(borrowerId))
    return null;

  let borrowedBook = await getActiveBorrowing(bookId, borrowerId);
  if (!borrowedBook) return null;

  borrowedBook = await borrowedBook.update(
    {
      return_date: new Date(),
    },
    { transaction }
  );

  await Book.increment({ quantity: 1 }, { where: { id: bookId }, transaction });

  return borrowedBook;
};

const getActiveBorrowing = function (bookId, borrowerId) {
  if (!isValidPositaveInteger(bookId) || !isValidPositaveInteger(borrowerId))
    return null;

  return BorrowedBook.findOne({
    where: {
      BookId: bookId,
      BorrowerId: borrowerId,
      return_date: { [Op.is]: null },
    },
  });
};

module.exports = { getActiveBorrowing, borrowBook, returnBook };
