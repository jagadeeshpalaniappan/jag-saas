const {
  createProxyMiddleware,
  responseInterceptor,
} = require("http-proxy-middleware");
const zlib = require("zlib");

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

const onProxyRes1 = (proxyRes, req, res) => {
  const bodyChunks = [];
  proxyRes.on("data", (chunk) => {
    bodyChunks.push(chunk);
  });
  proxyRes.on("end", () => {
    const body = Buffer.concat(bodyChunks);
    let microAppResp = body.toString("utf8");
    console.log("::end");
    console.log(microAppResp);
    res.render("pages/microapp", {
      microAppResp,
      navs,
      title: "Microapp: " + req.params.appId,
    });
  });
};

const onProxyRes2 = responseInterceptor(
  async (responseBuffer, proxyRes, req, res) => {
    // log original request and proxied request info
    const exchange = `[DEBUG] ${req.method} ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
    console.log(exchange); // [DEBUG] GET / -> http://www.example.com [200]

    // log complete response
    const response = responseBuffer.toString("utf8");
    console.log(response); // log response body

    return response;
  }
);

const onProxyRes3 = async (proxyRes, req, res) => {
  res.end = (data) => {
    console.log("##############::end4");
  };
  onProxyRes2(proxyRes, req, res);
};

/**
 * Streaming decompression of proxy response
 * source: https://github.com/apache/superset/blob/9773aba522e957ed9423045ca153219638a85d2f/superset-frontend/webpack.proxy-config.js#L116
 */
function decompress(proxyRes, contentEncoding) {
  let _proxyRes = proxyRes;
  let decompress;
  switch (contentEncoding) {
    case "gzip":
      decompress = zlib.createGunzip();
      break;
    case "br":
      decompress = zlib.createBrotliDecompress();
      break;
    case "deflate":
      decompress = zlib.createInflate();
      break;
    default:
      break;
  }
  if (decompress) {
    _proxyRes.pipe(decompress);
    _proxyRes = decompress;
  }
  return _proxyRes;
}

function onProxyRes(proxyRes, req, res) {
  const originalProxyRes = proxyRes;
  let buffer = Buffer.from("", "utf8");
  // decompress proxy response
  const _proxyRes = decompress(proxyRes, proxyRes.headers["content-encoding"]);
  // concat data stream
  _proxyRes.on("data", (chunk) => (buffer = Buffer.concat([buffer, chunk])));
  _proxyRes.on("end", () => {
    const responseBuffer = Buffer.from(buffer);
    const microAppResp = responseBuffer.toString("utf8");
    console.log("###end####");
    console.log(microAppResp);
    res.render("pages/microapp", {
      microAppResp,
      navs,
      title: "Microapp: " + req.params.appId,
    });
  });
  _proxyRes.on("error", (error) => {
    res.end(`Error fetching proxied request: ${error.message}`);
  });
}

const options1 = {
  // target: POSTS_API,
  changeOrigin: true,
  proxyTimeout: 5000,
  // pathRewrite: function (path, req) {
  //   return path.replace("/app1", "");
  // },
  router: getMicroAppUrl,
  selfHandleResponse: true, // selfHandleResponse=true (prevent automatic call of res.end())
  onProxyRes: onProxyRes,
  logLevel: "debug",
};

const options2 = {
  changeOrigin: true,
  proxyTimeout: 5000,
  // pathRewrite: function (path, req) {
  //   return path.replace("/app1", "");
  // },
  router: getMicroAppUrl,
  logLevel: "debug",
};

const apiProxyOpts = {
  changeOrigin: true,
  proxyTimeout: 5000,
  router: getApiUrl,
  logLevel: "debug",
};

// working
const proxyMicroAppOpts = {
  target: "http://localhost:3000",
  changeOrigin: true,
  logLevel: "debug",
  pathRewrite: function (path, req) {
    return path.replace("/app1/", "/");
  },
};

module.exports = {
  validateMicroApp,
  proxyMicroApp: createProxyMiddleware(proxyMicroAppOpts),
  proxyApi: createProxyMiddleware(apiProxyOpts),
};
