const reportingControler = require("../controllers/reporting.controller");
// rate limit middle ware
const limiter = require("../../../middlewares/rateLimiting");
const express = require("express");
const reportingRouter = express.Router();

reportingRouter.get(
  "/borrowingRequests",
  limiter,
  reportingControler.getBorrowingRequests
);
reportingRouter.get(
  "/overdueBorrows",
  limiter,
  reportingControler.getOverdueBorrows
);

module.exports = reportingRouter;
