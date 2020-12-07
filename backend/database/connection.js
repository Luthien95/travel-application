const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/travelApplication", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mamy połączenie");
});
