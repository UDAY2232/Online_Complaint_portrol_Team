import express from "express";
import pool from "../Service.js";
import multer from "multer";

const router = express.Router();

// 🔹 File upload setup (optional)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ POST - Submit anonymous complaint
router.post("/", upload.single("file"), async (req, res) => {
  const { name, category, description, priority } = req.body;
  const file = req.file ? req.file.buffer : null;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO anonymous_complaints (name, category, description, priority, file) VALUES (?, ?, ?, ?, ?)",
      [name || "Anonymous", category, description, priority, file]
    );
    connection.release();

    res.json({ success: true, message: "Anonymous complaint submitted successfully!" });
  } catch (err) {
    console.error("❌ Error submitting complaint:", err);
    res.status(500).json({ success: false, message: "Submission failed!" });
  }
});

export default router;
