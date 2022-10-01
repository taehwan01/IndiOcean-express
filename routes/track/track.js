import express from "express";
import TrackController from "./track.controller.js";

const router = express.Router();
const trackController = new TrackController();

router.get("/list", trackController.list);

router.post("/add", (req, res) => {});

export default router;
