const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/technologies", require("./routes/technologies"));
app.use("/api/batches", require("./routes/batches"));
app.use("/api/participants", require("./routes/participants"));
app.use("/api/evaluations", require("./routes/evaluations"));
app.use("/api", require("./routes/reports"));
app.use("/api/batches", require("./routes/batches"));


/* AUTO CREATE ADMIN */
db.query("SELECT * FROM users WHERE email='admin@mock.com'", async (err, result) => {
  if (err) {
    console.log("DB check error:", err);
    return;
  }

  if (result.length === 0) {
    const hash = await bcrypt.hash("admin123", 10);

    db.query(
      "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
      ["Main Admin", "admin@mock.com", hash, "admin"],
      () => console.log("✅ Admin created")
    );
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
