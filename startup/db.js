const { Sequelize } = require("sequelize");
const config = require("config");
const winston = require("winston");

//create one sequelize object for the whole application and connect to the database
const sequelize = new Sequelize(
  config.get("db.database"),
  config.get("db.username"),
  config.get("db.password"),
  {
    host: config.get("db.host"),
    dialect: config.get("db.dialect"),
    pool: {
      max: config.get("db.pool.max"),
      min: config.get("db.pool.min"),
      acquire: config.get("db.pool.acquire"),
      idle: config.get("db.pool.idle"),
    },
  }
);

global.sequelize = sequelize;

(async function () {
  //test the connectivity
  await sequelize.authenticate();
  winston.info("Connection to db has been established successfully.");

  //define the models
  require("../features/books/models/book.model");
  require("../features/borrowers/models/borrower.model");
  require("../features/BorrowedBooks/models/borrowedBook.model");

  //synchronize the models to the database
  await sequelize.sync({ alter: true });
  winston.info("All models were synchronized successfully.");
})();


