import express from "express";
// import path from "path";
import mysql from "mysql";

import trackRouter from "./routes/track.js";
import playlistRouter from "./routes/playlist.js";

const app = express();

app.get("/", (req, res) => {
  res.send("IT WORKED!!!");
});

app.use("/track", trackRouter);

app.use("/playlist", playlistRouter);

app.listen(3000, () => {
  console.log("Server on port 3000");
});
