const { Borrower } = require("../models/borrower.model");

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
