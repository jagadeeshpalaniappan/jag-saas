const express = require("express");
// const courseRoutes = require("../tenant/routes");
// const permissionRoutes = require("../permission/routes");

const router = express.Router();

// GET: health-check api
router.get("/health-check", (req, res) => res.send("OK"));

// mount courses routes at /api/courses
// router.use("/courses", courseRoutes);
// router.use("/permissions", permissionRoutes);

module.exports = router;
