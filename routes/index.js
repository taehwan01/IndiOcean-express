import express from "express";

import playlist from "./playlist/playlist.js";
import track from "./track/track.js";

const router = express.Router();

router.use("/playlist", playlist);

router.use("/track", track);

export default router;
