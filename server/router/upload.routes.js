import express from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import csvtojson from "csvtojson";
import fs from "fs";

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const jsonArray = await csvtojson().fromFile(req.file.path);

    fs.unlinkSync(req.file.path);

    res.json(jsonArray);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error parsing CSV file.");
  }
});

export default router;
