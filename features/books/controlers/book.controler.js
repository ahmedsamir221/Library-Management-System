const { isValidPositaveInteger } = require("../../../utils/commonValidation");
const bookService = require("../services/book.service");
const {
  generateSuccessResponse,
  generatefailureResponse,
} = require("../../../utils/endUserResponses");

module.exports.getAllBooks = async (req, res) => {
  if (!req.query.pageNumber)
    return res
      .status(400)
      .send(generatefailureResponse("pageNumber query parameter is missing"));

  if (!isValidPositaveInteger(req.query.pageNumber))
    return res
      .status(400)
      .send(generatefailureResponse("invalid pageNumber query parameter"));

  const books = await bookService.getAllBooks(req.query.pageNumber);

  res.send(generateSuccessResponse(books));
};

module.exports.getBookById = async (req, res) => {
  const book = await bookService.getBookById(req.params.id);

  if (!book)
    return res.status(404).send(generatefailureResponse("book not found"));

  res.send(generateSuccessResponse(book));
};

module.exports.createBook = async (req, res) => {
  const transaction = await global.sequelize.transaction();
  try {
    let book = await bookService.getBookByISBN(req.body.isbn);
    if (book)
      return res
        .status(400)
        .send(
          generatefailureResponse("book with the same ISBN already exists.")
        );

    book = await bookService.createBook(req.body, transaction);

    await transaction.commit();
    res.status(201).send(generateSuccessResponse(book));
  } catch (ex) {
    await transaction.rollback();
    // throw error to be logged and handled by error middleware
    throw new Error(ex);
  }
};

module.exports.updateBook = async (req, res) => {
  const transaction = await global.sequelize.transaction();
  try {
    const oldBook = await bookService.getBookById(req.params.id);
    if (!oldBook)
      return res.status(404).send(generatefailureResponse("book not found"));

    if (req.body.isbn) {
      const anyBook = await bookService.getBookByISBN(req.body.isbn);
      if (anyBook && anyBook.id != oldBook.id)
        return res
          .status(400)
          .send(
            generatefailureResponse("book with the same ISBN already exists.")
          );
    }

    const updatedBook = await bookService.updateBook(
      req.params.id,
      req.body,
      transaction
    );
    // double-check in case of another transaction deleted the record
    if (!updatedBook)
      return res.status(404).send(generatefailureResponse("book not found"));

    await transaction.commit();
    res.send(generateSuccessResponse(updatedBook));
  } catch (ex) {
    await transaction.rollback();
    // throw error to be logged and handled by error middleware
    throw new Error(ex);
  }
};

module.exports.deleteBook = async (req, res) => {
  const transaction = await global.sequelize.transaction();
  try {
    const deletedBook = await bookService.deleteBook(
      req.params.id,
      transaction
    );
    if (!deletedBook)
      return res.status(404).send(generatefailureResponse("book not found"));

    await transaction.commit();
    res.send(generateSuccessResponse(deletedBook));
  } catch (ex) {
    await transaction.rollback();
    // throw error to be logged and handled by error middleware
    throw new Error(ex);
  }
};

module.exports.search = async (req, res) => {
  if (req.query.title) {
    const books = await bookService.searchBooksByTitle(req.query.title);
    return res.send(generateSuccessResponse(books));
  }

  if (req.query.author) {
    const books = await bookService.searchBooksByAuthor(req.query.author);
    return res.send(generateSuccessResponse(books));
  }

  if (req.query.isbn) {
    const books = await bookService.searchBooksByISBN(req.query.isbn);
    return res.send(generateSuccessResponse(books));
  }

  res.send(generateSuccessResponse([]));
};
