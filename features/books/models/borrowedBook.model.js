const { DataTypes } = require("sequelize");
const { Book } = require("./book.model");
const { Borrower } = require("../../borrowers/index");

// Define BorrowedBook model
const BorrowedBook = global.sequelize.define(
  "BorrowedBook",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    borrowed_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ["BookId"],
      },
      {
        unique: false,
        fields: ["BorrowerId"],
      },
    ],
  }
);

Book.belongsToMany(Borrower, {
  through: { model: BorrowedBook, unique: false },
});
Borrower.belongsToMany(Book, {
  through: { model: BorrowedBook, unique: false },
});

module.exports.BorrowedBook = BorrowedBook;
