import express from "express";
import multer from "multer";
import path from "path";
import TrackController from "./track.controller.js";

const router = express.Router();
// const upload = multer({ dest: "uploads/" });
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      const ext = path.extname(file.originalname);
      if (ext === ".png" || ext === ".jpg") done(null, "uploads/image");
      if (ext === ".wav" || ext === ".mp3") done(null, "uploads/audio");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      console.log(ext);
      const filename = path.basename(file.originalname, ext) + "_" + Date.now() + ext;
      done(null, filename);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
const trackController = new TrackController();

router.get("/list", trackController.list);

router.post(
  "/add",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "audio_file", maxCount: 1 },
  ]),
  trackController.add
);

router.post("/update", trackController.update);

router.get("/delete", trackController.delete);

export default router;
