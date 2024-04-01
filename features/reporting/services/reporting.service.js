const moment = require("moment");
let converter = require("json-2-csv");
const { QueryTypes } = require("sequelize");

const getBorrowingRequests = async function (fromDate, toDate) {
  const rawQuery = `
SELECT 
book."title" as "book title",
book."author" as "book author",
book."isbn" as "book isbn",
borrower."name" as "borrower name",
borrower."email" as "borrower email",
TO_CHAR(borrowing."borrowed_date", 'YYYY-MM-DD') as "borrowing date"
	 
FROM public."Books" as book
inner join	public."BorrowedBooks" as borrowing on book.id = borrowing."BookId"
inner join public."Borrowers" as borrower on borrower.id = borrowing."BorrowerId"

where TO_CHAR(borrowing."borrowed_date", 'YYYY-MM-DD') between '${fromDate}' and '${toDate}'

order by borrowing."borrowed_date"`;

  const reportData = await global.sequelize.query(rawQuery, {
    type: QueryTypes.SELECT,
  });

  return converter.json2csv(reportData);
};

const getOverdueBorrows = async function (fromDate, toDate) {
  const rawQuery = `
SELECT 
book."title" as "book title",
book."author" as "book author",
book."isbn" as "book isbn",
borrower."name" as "borrower name",
borrower."email" as "borrower email",
TO_CHAR(borrowing."borrowed_date", 'YYYY-MM-DD') as "borrowing date",
TO_CHAR(borrowing."due_date", 'YYYY-MM-DD') as "due date",
TO_CHAR(borrowing."return_date", 'YYYY-MM-DD') as "return date"
	 
FROM public."Books" as book
inner join	public."BorrowedBooks" as borrowing on book.id = borrowing."BookId"
inner join public."Borrowers" as borrower on borrower.id = borrowing."BorrowerId"
	
where 
	(TO_CHAR(borrowing."borrowed_date", 'YYYY-MM-DD') between '${fromDate}' and '${toDate}')
	and
	(
		(TO_CHAR(borrowing."return_date", 'YYYY-MM-DD') is null and TO_CHAR(NOW(), 'YYYY-MM-DD') > TO_CHAR(borrowing."due_date", 'YYYY-MM-DD'))
		or 
		(TO_CHAR(borrowing."return_date", 'YYYY-MM-DD') > TO_CHAR(borrowing."due_date", 'YYYY-MM-DD'))
	)

order by borrowing."borrowed_date"`;

  const reportData = await global.sequelize.query(rawQuery, {
    type: QueryTypes.SELECT,
  });

  return converter.json2csv(reportData);
};

const isValidateRangeDates = function (fromDate, toDate) {
  return (
    moment(fromDate, "YYYY-MM-DD", true).isValid() &&
    moment(toDate, "YYYY-MM-DD", true).isValid()
  );
};

module.exports = {
  getBorrowingRequests,
  getOverdueBorrows,
  isValidateRangeDates,
};
