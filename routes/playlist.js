import express from "express";

const router = express.Router();

router.get("/list", (req, res) => {
  res.send("Playlist List Accessed.");
});

export default router;
