const { getErr } = require("./error");
const { isNotEmpty } = require("./common");

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
      if (ok) {
        // data:
        const respBody = {};
        if (data) respBody.data = data; // partial-data
        if (errors) respBody.errors = errors; // partial-data
        res.status(status || 200).json(respBody);
      }

      // error:
      if (!isNotEmpty(errors)) errors.push(UNOWN_ERROR);
      res.status(status || 500).json({ errors });
    } catch (err) {
      console.error(`${req.originalUrl}:catch:error`);
      console.error(err);
      res.status(500).json({ error: getErr({ errObj: err }) });
    }
  };
}

module.exports = {
  hrr,
};
