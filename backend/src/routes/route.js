import express from "express";
import upload from "../src/upload.js";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");
const route = express.Router();

let name = "testing";

route.post("/upload", upload.single("file"), async (req, res) => {
  console.log("File received:", req.file);
  try {
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const inputBuffer = req.file.buffer;
    const filename = `${Date.now()}-enhanced.jpg`;
    const outputPath = `${uploadDir}/${Date.now()}-enhanced.jpg`;

    await sharp(inputBuffer)
      .resize(800)
      .normalize()
      .modulate({ brightness: 1.2, saturation: 1.1 })
      .sharpen()
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    res.status(200).json({
      message: "image enhanced successfully",
      image: `http://localhost:3000/uploads/${filename}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default route;
