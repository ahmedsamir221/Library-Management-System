const service = require("../services/book.service");
const {
  generateSuccessResponse,
  generatefailureResponse,
} = require("../../../utils/endUserResponses");

module.exports.getAllBooks = async (req, res) => {
  const books = await service.getAllBooks();

  res.send(generateSuccessResponse(books));
};

module.exports.getBookById = async (req, res) => {
  const book = await service.getBookById(req.params.id);

  if (!book)
    return res.status(404).send(generatefailureResponse("book not found"));

  res.send(generateSuccessResponse(book));
};

module.exports.createBook = async (req, res) => {
  let book = await service.getByISBN(req.body.isbn);
  if (book)
    return res
      .status(400)
      .send(generatefailureResponse("book with the same ISBN already exists."));

  book = await service.createBook(req.body);

  res.status(201).send(generateSuccessResponse(book));
};

module.exports.updateBook = async (req, res) => {
  const oldBook = await service.getBookById(req.params.id);
  if (!oldBook)
    return res.status(404).send(generatefailureResponse("book not found"));

  if (req.body.isbn) {
    const anyBook = await service.getByISBN(req.body.isbn);
    if (anyBook && anyBook.id != oldBook.id)
      return res
        .status(400)
        .send(
          generatefailureResponse("book with the same ISBN already exists.")
        );
  }

  const book = await service.updateBook(req.params.id, req.body);

  res.send(generateSuccessResponse(book));
};

module.exports.deleteBook = async (req, res) => {
  const book = await service.deleteBook(req.params.id);
  if (!book)
    return res.status(404).send(generatefailureResponse("book not found"));

  res.send(generateSuccessResponse(book));
};

module.exports.search = async (req, res) => {
  if (req.query.title) {
    const books = await service.searchByTitle(req.query.title);
    return res.send(generateSuccessResponse(books));
  }

  if (req.query.author) {
    const books = await service.searchByAuthor(req.query.author);
    return res.send(generateSuccessResponse(books));
  }

  if (req.query.isbn) {
    const books = await service.searchByISBN(req.query.isbn);
    return res.send(generateSuccessResponse(books));
  }

  res.send(generateSuccessResponse([]));
};
