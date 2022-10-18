import express from "express";
import { upload, TrackController } from "./track.controller.js";

const router = express.Router();
router.use("/list/uploads/image", express.static("uploads/image"));
router.use("/list/uploads/audio", express.static("uploads/audio"));

const trackController = new TrackController();

router.use(express.json({ limit: "50mb" }));

router.get("/list", trackController.list);

router.post(
  "/add",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "audio_file", maxCount: 1 },
  ]),
  trackController.add
);

router.post("/test", trackController.test);

router.post("/update", trackController.update);

router.get("/delete", trackController.delete);

export default router;
