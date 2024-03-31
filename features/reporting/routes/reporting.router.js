const reportingControler = require("../controllers/reporting.controller");
const limiter = require("../../../middlewares/rateLimiting");
const express = require("express");
const router = express.Router();

router.get(
  "/borrowingProcesses",
  limiter,
  reportingControler.getBorrowingProcesses
);
router.get(
  "/overdueBorrows",
  limiter,
  reportingControler.getOverdueBorrows
);

module.exports = router;
