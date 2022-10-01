import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9080",
  database: "indiocean",
});

class PlaylistController {
  list = (req, res) => {
    connection.query("SELECT * FROM playlist", function (error, results, fields) {
      if (error) console.log(error);
      console.log("PRINT playlist DATA: ");
      console.log(results);
      res.json(results);
    });
  };
}

export default PlaylistController;
