const router=require("express").Router();
const db=require("../db");

router.post("/",(req,res)=>{
 db.query(
 "INSERT INTO evaluations(participant_id,round_number,score,feedback) VALUES (?,?,?,?)",
 [req.body.participant_id,req.body.round_number,req.body.score,req.body.feedback],
 ()=>res.json({message:"Evaluation saved"})
 );
});

module.exports=router;
