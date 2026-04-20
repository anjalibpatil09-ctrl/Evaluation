const router=require("express").Router();
const db=require("../db");

router.get("/",(req,res)=>{
 db.query("SELECT * FROM technologies",(e,r)=>res.json(r));
});

router.post("/",(req,res)=>{
 db.query("INSERT INTO technologies(name) VALUES(?)",[req.body.name],
 ()=>res.json({message:"Technology added"}));
});

module.exports=router;
