const { v4: uuidv4 } = require("uuid");

module.exports.generateSuccessResponse = (data) => {
  return {
    requestId: uuidv4(),
    status: "success",
    data: data,
  };
};

module.exports.generatefailureResponse = (error) => {
  return {
    requestId: uuidv4(),
    status: "failure",
    error: error,
  };
};
