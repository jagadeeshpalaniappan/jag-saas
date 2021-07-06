const { StatusCodes } = require("http-status-codes");

function getErr({
  httpCode = StatusCodes.INTERNAL_SERVER_ERROR,
  errCode = "INTERNAL_SERVER_ERROR",
  errSrc = "UNKNOWN",
  errReason = "Something failed, Please try again",
  errDetails,
  errObj,
}) {
  console.error(errObj);
  if (errObj && errObj instanceof Error) {
    // enable: stackTrace
    errDetails.stackTrace = JSON.stringify(
      errObj,
      Object.getOwnPropertyNames(errObj)
    );
  }
  return {
    httpCode,
    errCode,
    errSrc,
    errReason,
    errDetails,
  };
}

function getDbErr({
  httpCode = StatusCodes.INTERNAL_SERVER_ERROR,
  errCode = "DB_ERROR",
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

function getValidationErr({
  httpCode = StatusCodes.BAD_REQUEST,
  errCode = "VALIDATION_ERROR",
  errSrc = "API-VALIDATION",
  errReason = "Validation failed",
  errDetails,
  errObj,
}) {
  return getErr({
    httpCode,
    errCode,
    errSrc,
    errReason,
    errDetails: {
      validationErrors: errObj.errors,
      ...errDetails,
    },
  });
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

module.exports = { getErr, getDbErr, getValidationErr, errorMiddleware };
