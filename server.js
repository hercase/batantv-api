const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const express = require('express');
const app = express();
const https = require("https");
const fs = require("fs");
const preview = require("./controllers/previews-controller");

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



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

// Test
app.get("/", (req, res) => {
  preview.updatePreview('UCPJt1Ugnfq-ZcoXsbWziafw', res)
});

require("./routers/channels-routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV == 'production'){
  const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/batan.tv/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/batan.tv/fullchain.pem")
  };

const sv = https.createServer(options, app);

sv.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in Production Mode.`);
});

} else {

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in Development Mode.`);
});

} 

