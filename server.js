const express = require("express");
const app = express();
const path = require("path");

app.listen(8080, function () {
  console.log("Server listening on port 8080...");
});

app.use(express.static(path.join(__dirname, "../IndiOcean-/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../IndiOcean-/build/index.html"));
});
