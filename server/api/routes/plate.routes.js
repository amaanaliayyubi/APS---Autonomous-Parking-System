const express = require("express");
const router = express.Router();
const axios = require("axios");
const FormData = require("form-data");

router.post("/recognize-plate", async (req, res) => {
  try {
    const { image } = req.body;

    // 🧠 Convert base64 → buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // 🔥 Create form-data
    const formData = new FormData();
    formData.append("upload", buffer, {
      filename: "plate.jpg",
      contentType: "image/jpeg",
    });

    const response = await axios.post(
      "https://api.platerecognizer.com/v1/plate-reader/",
      formData,
      {
        headers: {
          ...formData.getHeaders(), // ✅ CRITICAL
          Authorization: `Token ${process.env.PLATE_API_KEY}`,
        },
        maxBodyLength: Infinity, // ✅ prevents axios size issues
      }
    );

    const result = response.data.results?.[0];

    if (result) {
      return res.json({
        plate: result.plate.toUpperCase(),
      });
    }

    return res.json({ plate: null });
  } catch (err) {
    console.error(
      "API ERROR:",
      err.response?.data || err.message
    );

    res.status(500).json({
      error: true,
      message: err.response?.data || "Unknown error",
    });
  }
});

module.exports = router;