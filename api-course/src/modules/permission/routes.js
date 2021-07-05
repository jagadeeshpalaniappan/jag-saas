const router = require("express").Router();
const validate = require("express-validation");
const ctrl = require("./controller");
const valdn = require("./validation");

router.route("/").post(ctrl.create);

router
  .route("/getAccessibleResources")
  .get(ctrl.getAccessibleResources)
  .post(ctrl.getAccessibleResources);

module.exports = router;
