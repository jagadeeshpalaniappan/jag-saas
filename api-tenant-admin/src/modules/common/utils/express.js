const { StatusCodes } = require("http-status-codes");
const { getErr } = require("./error");
const { isNotEmpty } = require("./common");

const DEFAULT_CODES = {
  success: StatusCodes.OK,
  error: StatusCodes.INTERNAL_SERVER_ERROR,
};

const UNOWN_ERROR = {
  reason: "Something went wrong. Please retry or contact support team.",
};

/**
 * hrr: handleReqResp
 * @param {*} cb
 * @returns
 */
function hrr(cb) {
  return async function (req, res, next) {
    try {
      console.log(`${req.originalUrl}:try:start`);

      const { status, ok, data, errors } = await cb(req, res, next);
      let statusCode = status; // assume: default status is error

      // res:body:
      const respBody = {};
      if (data) respBody.data = data;
      if (isNotEmpty(errors)) respBody.errors = errors;

      if (ok) {
        // success:
        statusCode = status || DEFAULT_CODES.success;
      } else {
        // error:
        statusCode = status || DEFAULT_CODES.error;
        if (!isNotEmpty(respBody.errors)) {
          respBody.errors = [UNOWN_ERROR];
        }
      }

      // res: send
      res.status(statusCode).json(respBody);
    } catch (err) {
      console.error(`${req.originalUrl}:catch:error`);
      console.error(err);
      const errors = getErr({ errObj: err });
      res.status(DEFAULT_CODES.error).json({ errors });
    }
  };
}

module.exports = {
  hrr,
};
