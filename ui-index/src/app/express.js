const express = require("express");
const helmet = require("helmet");
const config = require("./config");

const appRoutes = require("./appRoutes");

const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// set static folder
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// app: routes
app.all("*", appRoutes);

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
