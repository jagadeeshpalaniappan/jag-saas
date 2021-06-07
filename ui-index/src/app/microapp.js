const {
  createProxyMiddleware,
  responseInterceptor,
} = require("http-proxy-middleware");
const zlib = require("zlib");

const isLocal = true;

const navs = [
  { title: "Course", appId: "course" },
  { title: "Student", appId: "student" },
  { title: "App3", appId: "app3" },
];

const microAppRouteMap = {
  course: "http://localhost:4001",
  student: "http://localhost:4002",
};

const apiRouteMap = {
  courses: "http://localhost:5001",
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
  if (microAppUrl) {
    console.log("Microapp: Found: ", req.params.appId);
    next();
  } else {
    console.log("Microapp: Not Found: ", req.params.appId);
    res.render("pages/microapp", {
      microAppResp: null,
      navs,
      title: "Microapp: Not Found",
      appId: req.params.appId,
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
      appId: req.params.appId,
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
    console.log("###resp####");
    // console.log(microAppResp);
    console.log("###end####");
    res.render("pages/microapp", {
      microAppResp,
      navs,
      appId: req.params.appId,
      title: "Microapp: " + req.params.appId,
    });
  });
  _proxyRes.on("error", (error) => {
    res.end(`Error fetching proxied request: ${error.message}`);
  });
}

const proxyApi = () => {
  return createProxyMiddleware({
    changeOrigin: true,
    proxyTimeout: 5000,
    router: getApiUrl,
    logLevel: "debug",
  });
};

const proxyMicroApp = () => {
  const onProxyReq = (proxyRes, req, res) => {
    var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log("###proxyMicroApp:onProxyReq####", fullUrl);
  };
  const pathRewrite = (path, req) => path.replace(`/${req.params.appId}`, "/");
  return createProxyMiddleware({
    target: "http://localhost:3000",
    router: getMicroAppUrl,
    changeOrigin: true,
    logLevel: "debug",
    onProxyReq,
    pathRewrite,
    selfHandleResponse: true, // selfHandleResponse=true (prevent automatic call of res.end())
    onProxyRes,
  });
};

const proxyMicroAppFiles = () => {
  const onProxyReq = (proxyRes, req, res) => {
    var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log("###proxyMicroAppFiles:onProxyReq####", fullUrl);
  };

  const pathRewrite = (path, req) => {
    const rewritePath = isLocal ? `/${req.params.appId}` : "/";
    return path.replace(`/${req.params.appId}`, rewritePath);
  };

  return createProxyMiddleware({
    target: "http://localhost:3000",
    router: getMicroAppUrl,
    changeOrigin: true,
    logLevel: "debug",
    onProxyReq,
    router: getMicroAppUrl,
    pathRewrite,
  });
};

module.exports = {
  validateMicroApp,
  proxyMicroApp,
  proxyMicroAppFiles,
  proxyApi,
};
