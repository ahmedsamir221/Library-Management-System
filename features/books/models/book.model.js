const { DataTypes } = require("sequelize");

// Define Book model
const Book = global.sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    shelf_location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ["title"],
      },
      {
        unique: false,
        fields: ["author"],
      },
      ,
      {
        unique: true,
        fields: ["isbn"],
      },
    ],
  }
);

module.exports.Book = Book;
