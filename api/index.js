const express = require('express');
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });
  
const noteRoutes = require("./notes");
router.use("/notes",noteRoutes);

module.exports = router;