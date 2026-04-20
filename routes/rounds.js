const express = require("express");
const db = require("../db");
const { verifyToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, isAdmin, (req,res)=>{
    const {technology_id, round_number, max_score} = req.body;
    db.query(
        "INSERT INTO rounds (technology_id,round_number,max_score) VALUES (?,?,?)",
        [technology_id,round_number,max_score],
        err=>{
            if(err) return res.status(500).json(err);
            res.json({message:"Round Configured"});
        }
    );
});

router.get("/:techId", verifyToken,(req,res)=>{
    db.query(
        "SELECT * FROM rounds WHERE technology_id=?",
        [req.params.techId],
        (err,result)=>res.json(result)
    );
});

module.exports = router;
