const { StatusCodes } = require("http-status-codes");
const { DB_ERROR } = require("../constants/error");

function getErr({
  httpCode = StatusCodes.INTERNAL_SERVER_ERROR,
  errCode = "INTERNAL_SERVER_ERROR",
  errSrc = "UNKNOWN",
  errReason = "Something failed, Please try again",
  errDetails,
  errObj,
  stackTrace,
}) {
  if (errObj && errObj instanceof Error) {
    // enable: stackTrace
    stackTrace = JSON.stringify(errObj, Object.getOwnPropertyNames(errObj));
  }
  return {
    httpCode,
    errCode,
    errSrc,
    errReason,
    errDetails,
    stackTrace,
  };
}

function getDbErr({
  httpCode = StatusCodes.INTERNAL_SERVER_ERROR,
  errCode = DB_ERROR,
  errSrc = "DB",
  errReason = "Database execution failed",
  errDetails,
  errObj,
}) {
  return getErr({
    httpCode,
    errCode,
    errSrc,
    errReason,
    errDetails: {
      dbError: errObj,
      ...errDetails,
    },
  });
}

/*
{
    "code": 11000,
    "index": 0,
    "errmsg": "E11000 duplicate key error collection: jschool-test-db.users index: userName_1 dup key: { userName: \"x3\" }",
    "op": {
        "_id": "60ea4b2f8b414084ce1117f5",
        "userName": "x3",
        "firstName": "User1",
        "lastName": "Tenant Admin",
        "createdBy": "TMP-USER1",
        "__v": 0,
        "createdAt": "2021-07-11T01:36:47.721Z",
        "updatedAt": "2021-07-11T01:36:47.721Z"
    }
}
*/

function convertMongoWriteErrors(writeErrors) {
  return writeErrors.map(({ index, code }) => ({ index, code }));
}

function errorMiddleware(err, req, res, next) {
  console.error("MIDDLEWARE:ERR:", err);

  // API-VALIDATION-ERROR:
  if (err.status === StatusCodes.BAD_REQUEST) {
    console.error("##API-VALIDATION-ERROR##");
    console.error(err);
    const error = getValidationErr({ errObj: err });
    return res.status(error.httpCode).json({ error });
  }

  // UNKWONN-ERROR:
  console.error("##UNKWONN-ERROR##");
  const error = getErr({ errObj: err });
  return res.status(error.httpCode).json({ error });
}

module.exports = {
  getErr,
  getDbErr,
  errorMiddleware,
  convertMongoWriteErrors,
};
