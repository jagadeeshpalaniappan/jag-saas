const express = require("express");
const courseRoutes = require("../course/routes");

const router = express.Router();

// GET: health-check api
router.get("/health-check", (req, res) => res.send("OK"));

// mount courses routes at /api/courses
router.use("/courses", courseRoutes);

module.exports = router;
