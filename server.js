const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9080",
  database: "indiocean",
});

connection.connect();

connection.query("SELECT * FROM track", function (error, results, fields) {
  if (error) console.log(error);
  console.log("What's in indiocean");
  console.log(results);
});

connection.end();

app.listen(8080, function () {
  console.log("Server listening on port 8080...");
});

app.use(express.static(path.join(__dirname, "../IndiOcean-/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../IndiOcean-/build/index.html"));
});
