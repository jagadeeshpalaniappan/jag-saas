const { getErr } = require("./error");
const { isNotEmpty } = require("./common");

const UNOWN_ERRORS = [
  { reason: "Something went wrong. Please retry or contact support team." },
];

/**
 * hp: handlePromise
 * @param {*} promiseFn
 * @returns
 */
function hp(promiseFn) {
  return new Promise((resolve) => {
    promiseFn
      .then((success) => {
        resolve({ success });
      })
      .catch((error) => {
        resolve({ error });
      });
  });
}

/**
 * hrr: handleReqResp
 * @param {*} cb
 * @returns
 */
function hrr(cb) {
  return async function (req, res, next) {
    try {
      console.log(`${req.originalUrl}:try:start`);
      const { status, success, error } = await cb(req, res, next);
      if (success) {
        // success:
        const respBody = { data: success };
        if (error) respBody.error = error; // partial-success
        res.status(status || 200).json(respBody);
      }

      // error:
      res.status(status || 500).json({ error: error || UNOWN_ERRORS });
    } catch (err) {
      console.error(`${req.originalUrl}:catch:error`);
      console.error(err);
      res.status(500).json({ error: getErr({ errObj: err }) });
    }
  };
}

module.exports = {
  hp,
  hrr,
};
