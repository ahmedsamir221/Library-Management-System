const { isValidPositaveInteger } = require("../../../utils/commonValidation");
const borrowerService = require("../services/borrower.service");
const {
  generateSuccessResponse,
  generatefailureResponse,
} = require("../../../utils/endUserResponses");

module.exports.getAllBorrowers = async (req, res) => {
  if (!req.query.pageNumber)
    return res
      .status(400)
      .send(generatefailureResponse("pageNumber query parameter is missing"));

  if (!isValidPositaveInteger(req.query.pageNumber))
    return res
      .status(400)
      .send(generatefailureResponse("invalid pageNumber query parameter"));

  const borrowers = await borrowerService.getAllBorrowers(req.query.pageNumber);

  res.send(generateSuccessResponse(borrowers));
};

module.exports.getBorrowerById = async (req, res) => {
  const borrower = await borrowerService.getBorrowerById(req.params.id);

  if (!borrower)
    return res.status(404).send(generatefailureResponse("borrower not found"));

  res.send(generateSuccessResponse(borrower));
};

module.exports.createBorrower = async (req, res) => {
  const transaction = await global.sequelize.transaction();
  try {
    let borrower = await borrowerService.getBorrowerByEmail(req.body.email);
    if (borrower)
      return res
        .status(400)
        .send(
          generatefailureResponse(
            "borrower with the same email already exists."
          )
        );

    const createdBorrower = await borrowerService.createBorrower(
      req.body,
      transaction
    );

    await transaction.commit();
    res.status(201).send(generateSuccessResponse(createdBorrower));
  } catch (ex) {
    await transaction.rollback();
    // throw error to be logged and handled by error middleware
    throw new Error(ex);
  }
};

module.exports.updateBorrower = async (req, res) => {
  const transaction = await global.sequelize.transaction();
  try {
    const oldBorrower = await borrowerService.getBorrowerById(req.params.id);
    if (!oldBorrower)
      return res
        .status(404)
        .send(generatefailureResponse("borrower not found"));

    if (req.body.email) {
      const anyBorrower = await borrowerService.getBorrowerByEmail(
        req.body.email
      );
      if (anyBorrower && anyBorrower.id != oldBorrower.id)
        return res
          .status(400)
          .send(
            generatefailureResponse(
              "borrower with the same email already exists."
            )
          );
    }

    const updatedBorrower = await borrowerService.updateBorrower(
      req.params.id,
      req.body,
      transaction
    );
    // double-check in case of another transaction deleted the record
    if (!updatedBorrower)
      return res
        .status(404)
        .send(generatefailureResponse("borrower not found"));

    await transaction.commit();
    res.send(generateSuccessResponse(updatedBorrower));
  } catch (ex) {
    await transaction.rollback();
    // throw error to be logged and handled by error middleware
    throw new Error(ex);
  }
};

module.exports.deleteBorrower = async (req, res) => {
  const transaction = await global.sequelize.transaction();
  try {
    const borrower = await borrowerService.deleteBorrower(
      req.params.id,
      transaction
    );
    if (!borrower)
      return res
        .status(404)
        .send(generatefailureResponse("borrower not found"));

    await transaction.commit();
    res.send(generateSuccessResponse(borrower));
  } catch (ex) {
    await transaction.rollback();
    // throw error to be logged and handled by error middleware
    throw new Error(ex);
  }
};

module.exports.getAllBooksByBorrowerId = async (req, res) => {
  const books = await borrowerService.getCurrentlyBorrowedBooksByBorrowerId(
    req.params.id
  );
  if (!books)
    return res.status(404).send(generatefailureResponse("borrower not found"));

  res.send(generateSuccessResponse(books));
};
