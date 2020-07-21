const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.channels = require("./channels.model.js")(mongoose);
db.previews = require("./previews.model.js")(mongoose);

module.exports = db;