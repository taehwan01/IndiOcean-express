import express from "express";
import mysql from "mysql";

const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9080",
  database: "indiocean",
});

router.get("/list", (req, res) => {
  connection.query("SELECT * FROM track", function (error, results, fields) {
    if (error) console.log(error);
    console.log("PRINT track DATA: ");
    console.log(results);
    res.json(results);
  });
});

router.post("/add", (req, res) => {});

export default router;
