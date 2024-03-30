const { Op } = require("sequelize");
const { Book } = require("../models/book.model");
const { BorrowedBook } = require("../models/borrowedBook.model");

async function borrowBook(bookId, borrowerId, dueDate) {
  const transaction = await global.sequelize.transaction();
  try {
    const [result] = await Book.decrement(
      { quantity: 1 },
      { where: { id: bookId, quantity: { [Op.gt]: 0 } } }
    );
    if (!result[1]) return null;

    const borrowedBook = await BorrowedBook.create({
      BookId: bookId,
      BorrowerId: borrowerId,
      due_date: dueDate,
    });

    await transaction.commit();

    return borrowedBook;
  } catch (ex) {
    await transaction.rollback();

    throw new Error(ex);
  }
}

async function returnBook(bookId, borrowerId) {
  const transaction = await global.sequelize.transaction();
  try {
    let borrowedBook = await getActiveBorrowing(bookId, borrowerId);
    if (!borrowedBook) return null;

    borrowedBook = await borrowedBook.update({
      return_date: new Date(),
    });

    await Book.increment({ quantity: 1 }, { where: { id: bookId } });

    await transaction.commit();

    return borrowedBook;
  } catch (ex) {
    await transaction.rollback();

    throw new Error(ex);
  }
}

function getActiveBorrowing(bookId, borrowerId) {
  return BorrowedBook.findOne({
    where: {
      BookId: bookId,
      BorrowerId: borrowerId,
      return_date: { [Op.is]: null },
    },
  });
}

module.exports = { getActiveBorrowing, borrowBook, returnBook };
