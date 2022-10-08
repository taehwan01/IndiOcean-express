import express from "express";
import multer from "multer";
import path from "path";
import TrackController from "./track.controller.js";

const router = express.Router();
// const upload = multer({ dest: "uploads/" });
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "uploads");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext) + "_" + Date.now() + ext;
      done(null, filename);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
const trackController = new TrackController();

router.get("/list", trackController.list);

router.post("/add", upload.array("filename"), trackController.add);

router.post("/update", trackController.update);

router.get("/delete", trackController.delete);

export default router;
