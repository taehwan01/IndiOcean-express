import express from "express";
// import path from "path";
import mysql from "mysql";
import cors from "cors";

import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use("/", router);

app.listen(8080, () => {
  console.log("Server on port 8080");
});
