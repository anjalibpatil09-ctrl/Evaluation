const router=require("express").Router();
const db=require("../db");

router.post("/",(req,res)=>{
 db.query(
 "INSERT INTO participants(name,email,batch_id,technology_id) VALUES (?,?,?,?)",
 [req.body.name,req.body.email,req.body.batch_id,req.body.technology_id],
 ()=>res.json({message:"Participant added"})
 );
});
/* GET ALL PARTICIPANTS WITH DETAILS */
router.get("/", (req, res) => {

  const sql = `
    SELECT 
      participants.id,
      participants.name,
      participants.email,
      technologies.name AS technology,
      batches.name AS batch
    FROM participants
    LEFT JOIN technologies ON participants.technology_id = technologies.id
    LEFT JOIN batches ON participants.batch_id = batches.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });

});



module.exports=router;
