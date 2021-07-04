const router = require("express").Router();
const validate = require("express-validation");
const ctrl = require("./controller");
const valdn = require("./validation");

router.route("/").get(ctrl.getAll).post(ctrl.create);

router.route("/get").post(ctrl.getAll);

module.exports = router;
