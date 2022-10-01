import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9080",
  database: "indiocean",
});

class TrackController {
  list = (req, res) => {
    connection.query("SELECT * FROM track", function (error, results, fields) {
      if (error) console.log(error);
      console.log("PRINT track DATA: ");
      console.log(results);
      res.json(results);
    });
  };
}

export default TrackController;
