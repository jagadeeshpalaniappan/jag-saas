const express = require("express");

const {
  validateMicroApp,
  proxyMicroApp,
  proxyMicroAppFiles,
  proxyApi,
} = require("../microapp");

const router = express.Router();

// GET: health-check api
router.get("/health-check", (req, res) => res.send("OK"));

// about page
router.get("/about", function (req, res) {
  res.render("pages/about", { title: "About" });
});

// 404 page
router.get("/404", function (req, res) {
  res.render("pages/404", { title: "404: Not Found" });
});

// proxy: api
// router.get("/api/:apiId/**", proxyApi());
router.get("/api/:apiId", proxyApi());

// proxy: MicroApps

router.use("/:appId/***", validateMicroApp, proxyMicroAppFiles());
router.use("/:appId", validateMicroApp, proxyMicroApp());

// // proxy: MicroApps
// router.get("/:appId", validateMicroApp, microAppHtmlProxy);
// // proxy: MicroApps (Static Files)
// router.get("/:appId/**", validateMicroApp, microAppFilesProxy);

// // proxy: MicroApps
// router.get("/:appId", validateMicroApp, microAppHtmlProxy);
// // proxy: MicroApps (Static Files)
// router.get("/:appId/**", validateMicroApp, microAppFilesProxy);

// router.use(
//   "/app1",
//   createProxyMiddleware({
//     target: "http://localhost:3000",
//     changeOrigin: true,
//     logLevel: "debug",
//   })
// );

// index page
// router.get("/", function (req, res) {
//   res.render("pages/index", { title: "Home" });
// });

module.exports = router;
