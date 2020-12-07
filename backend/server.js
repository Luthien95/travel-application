const config = require("config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

if (!config.get("jwtPrivateKey")) {
  console.error("Wrong jwtPrivateKey");
  process.exit(1);
}

require("./database/connection");
require("./startup/routes")(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));
