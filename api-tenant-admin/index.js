const db = require("./src/modules/app/db");
const express = require("./src/modules/app/express");

db.init();
express.init();
