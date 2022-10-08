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
    let sql = "INSERT INTO track (title, artist_name, cover_image, audio_file) VALUES (?, ?, ?, ?);";
    console.log(req.body);
    console.log("imgFILES: ", req.files);
    // console.log("audFILES: ", req.files.audio_file[0].filename);
    let title = req.body.title;
    let artist_name = req.body.artist_name;
    let cover_image = req.files.cover_image[0].filename;
    let audio_file = req.files.audio_file[0].filename;
    connection.query(sql, [title, artist_name, cover_image, audio_file], function (error, results, fields) {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: "Add failed" });
      } else {
        // console.log("< " + req.query.title + " > track inserted");
        return res.status(200).json({ title: title, artist_name: artist_name, cover_image: cover_image, audio_file: audio_file, message: "Add track success" });
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
