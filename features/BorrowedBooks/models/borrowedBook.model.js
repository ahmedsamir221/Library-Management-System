const { DataTypes } = require("sequelize");
const { Book } = require("../../books/index");
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
    unique: false,
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

Book.belongsToMany(Borrower, { through: BorrowedBook });
Borrower.belongsToMany(Book, { through: BorrowedBook });

module.exports.BorrowedBook = BorrowedBook;
