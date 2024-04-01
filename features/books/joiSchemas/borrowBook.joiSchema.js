const Joi = require("joi").extend(require("@joi/date"));
var moment = require("moment");
moment().format();

const borrowBookSchema = Joi.object({
  dueDate: Joi.date()
    .utc()
    .format("YYYY-MM-DD")
    .min(moment().utc().format("YYYY-MM-DD"))
    .message("dueDate must be greater than or equal to current date")
    .required(),
});

module.exports = borrowBookSchema;
