const { Borrower } = require("./models/borrower.model");
const borrowerRouter = require("./routes/borrower.router");
const borrowerService = require("./services/borrower.service");

module.exports = {
  Borrower,
  borrowerRouter,
  borrowerService,
};
