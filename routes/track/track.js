import express from "express";
import multer from "multer";
import TrackController from "./track.controller.js";

const router = express.Router();
const trackController = new TrackController();

router.get("/list", trackController.list);

router.post("/add", multer({ dest: "upload/" }).single("image"), trackController.add);

router.post("/update", trackController.update);

router.get("/delete", trackController.delete);

export default router;
