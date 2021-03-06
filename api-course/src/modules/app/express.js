const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config");

const apiRoutes = require("./apiRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// api: routes
app.use("/api", apiRoutes);

// handle: error
app.use((err, req, res, next) => {
  return res.status(err.status).json(err);
});

// init: expressApp
function init() {
  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `EXPRESS:INITIALIZED [PORT=${config.port}] [NODE_ENV=${config.env}]`
    );
  });
}
module.exports = { app, init };
