import express from "express";
import PlaylistController from "./playlist.controller.js";

const router = express.Router();
const playlistController = new PlaylistController();

router.get("/list", playlistController.list);

export default router;
