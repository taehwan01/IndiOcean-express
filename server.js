const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const { response } = require("express");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9080",
  database: "indiocean",
});

// connection.connect();

app.get("/api/track", function (req, res) {
  connection.query("SELECT * FROM track", function (error, results, fields) {
    if (error) console.log(error);
    console.log("PRINT track DATA: ");
    console.log(results);
    res.json(results);
  });
});

app.get("/api/playlist", function (req, res) {
  connection.query("SELECT * FROM playlist", function (error, results, fields) {
    if (error) console.log(error);
    console.log("PRINT playlist DATA: ");
    console.log(results);
  });
});

app.get("/api/lists", function (req, res) {
  connection.query("SELECT * FROM lists", function (error, results, fields) {
    if (error) console.log(error);
    console.log("PRINT lists DATA: ");
    console.log(results);
  });
});

app.listen(8080, function () {
  console.log("Server listening on port 8080...");
});

app.use(express.static(path.join(__dirname, "../IndiOcean-/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../IndiOcean-/build/index.html"));
});

app.get("/api/track/add", function (req, res) {});

// connection.end();
