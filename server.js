const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

const Image = require("./models/Image");

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const newImage = new Image({
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype
    });

    await newImage.save();

    res.status(201).json({
      message: "Image uploaded successfully",
      imageId: newImage._id
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/image/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set("Content-Type", image.contentType);
    res.send(image.data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});