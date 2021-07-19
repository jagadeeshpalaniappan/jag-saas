const { getErr } = require("./error");

function handleReqResp(cb) {
  return async function (req, res, next) {
    try {
      console.log(`${req.originalUrl}:try:start`);
      const { status, success, error } = await cb(req, res, next);
      if (error) res.status(status || 500).json({ error });
      else res.status(status || 200).json(success);
    } catch (err) {
      console.error(`${req.originalUrl}:catch:error`);
      console.error(err);
      res.status(500).json({ error: getErr({ errObj: err }) });
    }
  };
}

module.exports = {
  handleReqResp,
};
