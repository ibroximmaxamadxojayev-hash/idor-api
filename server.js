const express = require("express");
const app = express();

const fileDatabase = {
  "file_2001": {
    userId: 2001,
    name: "Alice File",
    content: "Alice data"
  },

  "file_9003": {
    userId: 9999,
    name: "Admin Secret",
    content: "FLAG: CTF{IDOR_WORKS_SUCCESS}"
  }
};

app.get("/api/files/:fileId", (req, res) => {
  const fileId = req.params.fileId;
  const file = fileDatabase[fileId];

  if (!file) return res.status(404).json({ error: "Not found" });

  // ❌ IDOR vulnerability: no authorization check
  res.json(file);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Running on port", PORT);
});
