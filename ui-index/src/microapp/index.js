const { createProxyMiddleware } = require("http-proxy-middleware");

const { responseInterceptor } = require("./utils");
const serviceDiscovery = require("./serviceDiscovery");
const sideNavs = require("./sideNavs");

const validateMicroApp = function (req, res, next) {
  const config = serviceDiscovery.microApp[req.params.appId];
  console.log("validateMicroApp: ", config);
  if (config && config.url) {
    console.log("Microapp: Found: ", req.params.appId);
    next();
  } else {
    console.log("Microapp: Not Found: ", req.params.appId);
    res.render("pages/microapp", {
      microAppResp: null,
      sideNavs,
      title: "Microapp: Not Found",
      appId: req.params.appId,
    });
  }
};

const proxyApi = () => {
  const router = (req) => {
    const config = serviceDiscovery.api[req.params.apiId];
    console.log("proxyApi: router:", config);
    return config.url;
  };
  return createProxyMiddleware({
    changeOrigin: true,
    proxyTimeout: 5000,
    router,
    logLevel: "debug",
  });
};

const proxyMicroApp = () => {
  const router = (req) => {
    const config = serviceDiscovery.microApp[req.params.appId];
    console.log("proxyMicroApp: router:", config);
    return config.url;
  };
  const onProxyReq = (proxyRes, req, res) => {
    var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log("###proxyMicroApp:onProxyReq####", fullUrl);
  };
  const pathRewrite = (path, req) => path.replace(`/${req.params.appId}`, "/");

  const onProxyRes = async (proxyRes, req, res) => {
    try {
      const microAppResp = await responseInterceptor(proxyRes, req, res);
      console.log("###resp####");
      // console.log(microAppResp);
      console.log("###end####");
      res.render("pages/microapp", {
        microAppResp,
        sideNavs,
        appId: req.params.appId,
        title: "Microapp: " + req.params.appId,
      });
    } catch (error) {
      console.log("###ERROR####");
      console.log(error);
    }
  };
  const onError = (err, req, res, target) => {
    res.render("pages/microapp", {
      microAppResp: null,
      sideNavs,
      title: "Microapp: Failed to Load",
      appId: req.params.appId,
    });
  };
  return createProxyMiddleware({
    target: "http://localhost:3000",
    router,
    changeOrigin: true,
    logLevel: "debug",
    onProxyReq,
    pathRewrite,
    selfHandleResponse: true, // selfHandleResponse=true (prevent automatic call of res.end())
    onProxyRes,
    onError,
  });
};

const proxyMicroAppFiles = () => {
  const router = (req) => {
    const config = serviceDiscovery.microApp[req.params.appId];
    console.log("proxyMicroAppFiles:proxyApi: router:", config);
    return config.url;
  };
  const onProxyReq = (proxyRes, req, res) => {
    var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log("###proxyMicroAppFiles:onProxyReq####", fullUrl);
  };

  const pathRewrite = (path, req) => {
    const config = serviceDiscovery.microApp[req.params.appId];
    const rewritePath = config.local ? `/${req.params.appId}` : "/";
    return path.replace(`/${req.params.appId}`, rewritePath);
  };

  return createProxyMiddleware({
    target: "http://localhost:3000",
    router,
    changeOrigin: true,
    logLevel: "debug",
    onProxyReq,
    router,
    pathRewrite,
  });
};

module.exports = {
  validateMicroApp,
  proxyMicroApp,
  proxyMicroAppFiles,
  proxyApi,
};
