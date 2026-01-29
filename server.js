const express = require("express");
const path = require("path");

const app = express();

/* Frontend papkani serve qilish */
app.use(express.static("public"));

/* Homepage route */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* API Database */
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

/* IDOR API endpoint */
app.get("/api/files/:fileId", (req, res) => {
  const file = fileDatabase[req.params.fileId];
  if (!file) return res.status(404).send("Not found");

  res.json(file);
});

/* Render port */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Running on port", PORT);
});
