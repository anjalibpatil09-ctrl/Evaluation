const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET ALL BATCHES */
router.get("/", (req, res) => {

  db.query("SELECT id, name FROM batches", (err, results) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(results);

  });

});

module.exports = router;
