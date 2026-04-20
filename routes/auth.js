const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
        [name, email, hashed, role],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "User Registered" });
        }
    );
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
        if (err || result.length === 0)
            return res.status(400).json({ message: "User not found" });

        const valid = await bcrypt.compare(password, result[0].password);
        if (!valid) return res.status(400).json({ message: "Wrong Password" });

        const token = jwt.sign(
            { id: result[0].id, role: result[0].role },
            "secretkey"
        );

        res.json({ token, role: result[0].role });
    });
});

module.exports = router;
