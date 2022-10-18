import mysql from "mysql";
import multer from "multer";
import path from "path";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9080",
  database: "indiocean",
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      const ext = path.extname(file.originalname);
      if (ext === ".png" || ext === ".jpg") done(null, "uploads/image");
      if (ext === ".wav" || ext === ".mp3") done(null, "uploads/audio");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext) + "_" + Date.now() + ext;
      done(null, filename);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

class TrackController {
  list = (req, res) => {
    console.log("~/track/list called");
    connection.query("SELECT * FROM track", function (error, results, fields) {
      if (error) console.log(error);
      return res.json(results);
    });
  };
  add = (req, res) => {
    console.log("~/track/add called");
    let sql = "INSERT INTO track (title, artist_name) VALUES (?, ?);";
    let title = req.body.title;
    let artist_name = req.body.artist_name;
    let params = [title, artist_name];
    console.log(req.files);
    if (req.files === null) {
      let cover_image = req.files.cover_image[0].filename;
      let audio_file = req.files.audio_file[0].filename;
      sql = "INSERT INTO track (title, artist_name, cover_image, audio_file) VALUES (?, ?, ?, ?);";
      params = [title, artist_name, cover_image, audio_file];
    }
    connection.query(sql, params, function (error, results, fields) {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: "Add failed" });
      } else {
        console.log("Succeeded ~/track/add");
        return res.status(200).json({ title: title, artist_name: artist_name, message: "Add track success" });
      }
    });
  };
  test = (req, res) => {
    console.log("test called");
    console.log("req.body: ", req.body);
    // let title = req.body.title;
    // let artist_name = req.body.artist_name;

    // console.log(title, artist_name);
    return res.json({ title: title, msg: "done" });
  };
  update = (req, res) => {
    console.log("~/track/update called");
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
    console.log("~/track/delete called");
    let sql = "DELETE FROM track WHERE id =?";
    let id = req.query.id;
    connection.query(sql, id, function (error, results, fields) {
      if (error) console.log(error);
      console.log("Deleted...");
      return res.json(results);
    });
  };
}

export { upload, TrackController };
