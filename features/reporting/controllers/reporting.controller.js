const reportingService = require("../services/reporting.service");
const { generatefailureResponse } = require("../../../utils/endUserResponses");

module.exports.getBorrowingProcesses = async (req, res) => {
  if (
    !reportingService.isValidateRangeDates(req.query.fromDate, req.query.toDate)
  )
    return res
      .status(400)
      .send(
        generatefailureResponse(
          'fromDate and toDate query parametars must follow "YYYY-MM-DD" format'
        )
      );

  const csvData = await reportingService.getBorrowingProcesses(
    req.query.fromDate,
    req.query.toDate
  );

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=Borrowing_Processes_report.csv`
  );

  res.send(csvData);
};

module.exports.getOverdueBorrows = async (req, res) => {
  if (
    !reportingService.isValidateRangeDates(req.query.fromDate, req.query.toDate)
  )
    return res
      .status(400)
      .send(
        generatefailureResponse(
          'fromDate and toDate query parametars must follow "YYYY-MM-DD" format'
        )
      );

  const csvData = await reportingService.getOverdueBorrows(
    req.query.fromDate,
    req.query.toDate
  );

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=Overdue_Borrows _report.csv`
  );

  res.send(csvData);
};
