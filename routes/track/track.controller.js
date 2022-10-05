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
      return res.json(results);
    });
  };
  add = (req, res) => {
    let sql = "INSERT INTO track (title, artist_name) VALUES (?, ?);";
    let title = req.query.title;
    let artist_name = req.query.artist_name;
    connection.query(sql, [title, artist_name], function (error, results, fields) {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: "Add failed" });
      } else {
        console.log("< " + req.query.title + " > track inserted");
        return res.status(200).json({ message: "Add track success" });
      }
    });
  };
  update = (req, res) => {
    let title = req.query.title;
    let artist = req.query.artist_name;
    if (title === "") {
      connection.query("UPDATE track SET artist_name='updateTest' WHERE id = 4", function (error, results, fields) {
        if (error) console.log(error);
        console.log("< " + artist + " > track updated");
        return res.status(200).json(results);
      });
    } else {
      return res.status(400).json({ message: "You reached nowhere..." });
    }
  };
  delete = (req, res) => {
    let sql = "DELETE FROM track WHERE id =?";
    let id = req.query.id;
    connection.query(sql, id, function (error, results, fields) {
      if (error) console.log(error);
      console.log("Deleted...");
      return res.json(results);
    });
  };
}

export default TrackController;
