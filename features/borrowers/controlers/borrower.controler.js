const service = require("../services/borrower.service");
const {
  generateSuccessResponse,
  generatefailureResponse,
} = require("../../../utils/endUserResponses");

module.exports.getAllBorrowers = async (req, res) => {
  const borrowers = await service.getAllBorrowers();

  res.send(generateSuccessResponse(borrowers));
};

module.exports.getBorrowerById = async (req, res) => {
  const borrower = await service.getBorrowerById(req.params.id);

  if (!borrower)
    return res.status(404).send(generatefailureResponse("borrower not found"));

  res.send(generateSuccessResponse(borrower));
};

module.exports.createBorrower = async (req, res) => {
  let borrower = await service.getBorrowerByEmail(req.body.email);
  if (borrower)
    return res
      .status(400)
      .send(
        generatefailureResponse("borrower with the same email already exists.")
      );

  borrower = await service.createBorrower(req.body);

  res.status(201).send(generateSuccessResponse(borrower));
};

module.exports.updateBorrower = async (req, res) => {
  const oldBorrower = await service.getBorrowerById(req.params.id);
  if (!oldBorrower)
    return res.status(404).send(generatefailureResponse("borrower not found"));

  if (req.body.email) {
    const anyBorrower = await service.getBorrowerByEmail(req.body.email);
    if (anyBorrower && anyBorrower.id != oldBorrower.id)
      return res
        .status(400)
        .send(
          generatefailureResponse(
            "borrower with the same email already exists."
          )
        );
  }

  const borrower = await service.updateBorrower(req.params.id, req.body);

  res.send(generateSuccessResponse(borrower));
};

module.exports.deleteBorrower = async (req, res) => {
  const borrower = await service.deleteBorrower(req.params.id);
  if (!borrower)
    return res.status(404).send(generatefailureResponse("borrower not found"));

  res.send(generateSuccessResponse(borrower));
};

module.exports.getAllBooksByBorrowerId = async (req, res) => {
  const books = await service.getAllBooksByBorrowerId(req.params.id);
  if (!books)
    return res.status(404).send(generatefailureResponse("borrower not found"));

  res.send(generateSuccessResponse(books));
};
