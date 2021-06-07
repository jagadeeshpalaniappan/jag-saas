const zlib = require("zlib");
const sideNavs = require("./sideNavs");

/**
 * SourceVersion: https://github.com/chimurai/http-proxy-middleware/blob/master/src/handlers/response-interceptor.ts
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

/**
 * SourceVersion: https://github.com/chimurai/http-proxy-middleware/blob/master/src/handlers/response-interceptor.ts
 * Issue: It is calling res.end()
 * ModifiedVersion: do not call res.end();
 */
function responseInterceptor(proxyRes, req, res) {
  return new Promise((resolve, reject) => {
    let buffer = Buffer.from("", "utf8");
    // decompress proxy response
    const _proxyRes = decompress(
      proxyRes,
      proxyRes.headers["content-encoding"]
    );
    // concat data stream
    _proxyRes.on("data", (chunk) => (buffer = Buffer.concat([buffer, chunk])));
    _proxyRes.on("end", () => {
      const responseBuffer = Buffer.from(buffer);
      const responseStr = responseBuffer.toString("utf8");
      resolve(responseStr);
    });
    _proxyRes.on("error", (error) => {
      reject(error);
    });
  });
}

module.exports = {
  responseInterceptor,
};
