const mongoose = require("mongoose");
const config = require("./config");

// make bluebird default Promise
Promise = require("bluebird");
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;

mongoose.connection.on("error", () => {
  console.error("DB:CONNECTION-FAILED");
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

mongoose.connection.once("open", function () {
  console.log("DB:CONNECTED");
});

function init() {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
module.exports = { init };
