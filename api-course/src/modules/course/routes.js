const router = require("express").Router();
const validate = require("express-validation");
const ctrl = require("./controller");
const valdn = require("./validation");

router
  .route("/")
  /** GET /api/courses - Get list of courses */
  .get(ctrl.getAll)
  /** POST /api/courses - Create new course */
  .post(validate(valdn.create), ctrl.create);

module.exports = router;
