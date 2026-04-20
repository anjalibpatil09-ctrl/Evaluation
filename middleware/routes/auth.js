const router=require("express").Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const db=require("../db");

/* REGISTER */
router.post("/register", (req, res) => {

  const { name, email, password, role } = req.body;

  // allow only evaluator or participant
  const safeRole =
    role === "participant" ? "participant" : "evaluator";

  bcrypt.hash(password, 10, (err, hash) => {

    db.query(
      "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
      [name, email, hash, safeRole],
      (err) => {

        if (err) return res.json(err);

        res.json({ message: "Registered successfully" });
      }
    );

  });

});

/* LOGIN */
router.post("/login",(req,res)=>{
 const {email,password}=req.body;

 db.query("SELECT * FROM users WHERE email=?",[email],async(e,r)=>{
  if(!r.length) return res.json({});

  const ok=await bcrypt.compare(password,r[0].password);
  if(!ok) return res.json({});

  const token=jwt.sign({id:r[0].id,role:r[0].role},"secret");
  res.json({token,role:r[0].role});
 });
});

module.exports=router;
