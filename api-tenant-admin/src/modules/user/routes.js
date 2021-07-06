const router = require("express").Router();
const validate = require("express-validation");
const ctrl = require("./controller");
const valdn = require("./validation");

router
  .route("/")
  /** GET /api/users - Get list of users */
  .get(ctrl.getAll)
  /** POST /api/users - Create new user */
  .post(validate(valdn.create), ctrl.create);
// .post(ctrl.create);

module.exports = router;
