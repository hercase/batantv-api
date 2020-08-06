const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const express = require('express');
const app = express();
const https = require("https");
const fs = require("fs");

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/batan.tv/fullchain.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/batan.tv/privkey.pem")
};


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  require("./routers/channels-routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
