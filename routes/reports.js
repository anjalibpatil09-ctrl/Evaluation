const express = require("express");
const db = require("../db");
const { verifyToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/average/:technology_id", verifyToken, isAdmin, (req, res) => {
    db.query(
        `SELECT round_number, AVG(score) as avg_score
         FROM evaluations e
         JOIN participants p ON e.participant_id = p.id
         WHERE p.technology_id = ?
         GROUP BY round_number`,
        [req.params.technology_id],
        (err, result) => {
            res.json(result);
        }
    );
});
router.get("/my-scores",(req,res)=>{

  const userId=req.user.id;

  const sql=`
    SELECT evaluations.round_number,evaluations.score,evaluations.feedback,
           technologies.name AS technology,
           batches.name AS batch
    FROM evaluations
    JOIN participants ON evaluations.participant_id=participants.id
    JOIN technologies ON participants.technology_id=technologies.id
    JOIN batches ON participants.batch_id=batches.id
    WHERE participants.user_id=?
  `;

  db.query(sql,[userId],(err,results)=>{
    if(err) return res.json(err);

    res.json({
      technology:results[0]?.technology,
      batch:results[0]?.batch,
      scores:results
    });
  });

});

module.exports = router;
