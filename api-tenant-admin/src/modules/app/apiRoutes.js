const express = require("express");
const userRoutes = require("../user/routes");
// const permissionRoutes = require("../permission/routes");

const router = express.Router();

// GET: health-check api
router.get("/health-check", (req, res) => res.send("OK"));

// mount users routes at /api/users
router.use("/users", userRoutes);
// router.use("/permissions", permissionRoutes);

module.exports = router;
