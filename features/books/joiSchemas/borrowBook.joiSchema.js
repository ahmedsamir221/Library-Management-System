const Joi = require("joi").extend(require("@joi/date"));
var moment = require('moment'); // require
moment().format(); 

module.exports = Joi.object({
  dueDate: Joi.date().utc()
    .format("YYYY-MM-DD")
    .min(moment().utc().format("YYYY-MM-DD"))
    .message('dueDate must be greater than or equal to current date')
    .required()
    
});
