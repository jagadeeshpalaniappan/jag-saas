const {
  createProxyMiddleware,
  responseInterceptor,
} = require("http-proxy-middleware");

const navs = [
  { title: "App1", url: "/app1" },
  { title: "App2", url: "/app2" },
  { title: "App3", url: "/app3" },
];

const microAppRouteMap = {
  app1: "http://localhost:3000",
};

const apiRouteMap = {
  courses: "http://localhost:8080",
};

const getMicroAppUrl = function (req) {
  console.log("getMicroAppUrl: appId:", req.params.appId);
  return microAppRouteMap[req.params.appId];
};

const getApiUrl = function (req) {
  console.log("getApiUrl: apiId:", req.params.apiId);
  return apiRouteMap[req.params.apiId];
};

const validateMicroApp = function (req, res, next) {
  const microAppUrl = getMicroAppUrl(req);
  console.log("validateMicroApp: ", {
    microAppUrl,
    originalUrl: req.originalUrl,
  });
  if (microAppUrl) next();
  else {
    res.render("pages/microapp", {
      microAppResp: null,
      navs,
      title: "Microapp: Not Found",
    });
  }
};

const onProxyRes = (proxyRes, req, res) => {
  const bodyChunks = [];
  proxyRes.on("data", (chunk) => {
    bodyChunks.push(chunk);
  });
  proxyRes.on("end", () => {
    const body = Buffer.concat(bodyChunks);
    let microAppResp = body.toString("utf8");
    console.log("::end"); // log response body
    res.render("pages/microapp", {
      microAppResp,
      navs,
      title: "Microapp: " + req.params.appId,
    });
  });
};

const options1 = {
  // target: POSTS_API,
  changeOrigin: true,
  proxyTimeout: 5000,
  router: getMicroAppUrl,
  selfHandleResponse: true, // selfHandleResponse=true (prevent automatic call of res.end())
  onProxyRes,
};

const options2 = {
  changeOrigin: true,
  proxyTimeout: 5000,
  router: getMicroAppUrl,
};

const apiProxyOpts = {
  changeOrigin: true,
  proxyTimeout: 5000,
  router: getApiUrl,
};

module.exports = {
  validateMicroApp,
  microAppHtmlProxy: createProxyMiddleware(options1),
  microAppFilesProxy: createProxyMiddleware(options2),
  apiProxy: createProxyMiddleware(apiProxyOpts),
};
