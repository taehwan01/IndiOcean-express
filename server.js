import express from "express";
// import path from "path";
import mysql from "mysql";

import router from "./routes/index.js";

const app = express();

app.use("/", router);

app.listen(3000, () => {
  console.log("Server on port 3000");
});
