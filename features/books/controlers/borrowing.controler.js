const borrowingService = require("../services/borrowing.service");
const bookService = require("../services/book.service");
const { borrowerService } = require("../../borrowers/index");
const {
  generateSuccessResponse,
  generatefailureResponse,
} = require("../../../utils/endUserResponses");

module.exports.borrowBook = async (req, res) => {
  const transaction = await global.sequelize.transaction();
  try {
    const book = await bookService.getBookById(req.params.bookId);
    if (!book)
      return res.status(404).send(generatefailureResponse("book not found"));

    const borrower = await borrowerService.getBorrowerById(
      req.params.borrowerId
    );
    if (!borrower)
      return res
        .status(404)
        .send(generatefailureResponse("borrower not found"));

    const activeBorrowing = await borrowingService.getActiveBorrowing(
      req.params.bookId,
      req.params.borrowerId
    );
    if (activeBorrowing)
      return res
        .status(400)
        .send(generatefailureResponse("borrower already borrowed this book"));

    const borrowedBook = await borrowingService.borrowBook(
      req.params.bookId,
      req.params.borrowerId,
      req.body.dueDate,
      transaction
    );
    
    await transaction.commit();

    if (!borrowedBook)
      return res
        .status(400)
        .send(generatefailureResponse("book is out of stock now."));

    res.status(201).send(generateSuccessResponse(borrowedBook));
  } catch (ex) {
    await transaction.rollback();
    // throw error to be logged and handled by error middleware
    throw new Error(ex);
  }
};

module.exports.returnBook = async (req, res) => {
  const transaction = await global.sequelize.transaction();
  try {
    const book = await bookService.getBookById(req.params.bookId);
    if (!book)
      return res.status(404).send(generatefailureResponse("book not found"));

    const borrower = await borrowerService.getBorrowerById(
      req.params.borrowerId
    );
    if (!borrower)
      return res
        .status(404)
        .send(generatefailureResponse("borrower not found"));

    const borrowedBook = await borrowingService.returnBook(
      req.params.bookId,
      req.params.borrowerId,
      transaction
    );

    await transaction.commit();

    if (!borrowedBook)
      return res
        .status(404)
        .send(generatefailureResponse("borrowing operation not found"));

    res.status(200).send(generateSuccessResponse(borrowedBook));
  } catch (ex) {
    await transaction.rollback();
    // throw error to be logged and handled by error middleware
    throw new Error(ex);
  }
};
