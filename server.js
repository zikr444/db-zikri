const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  host: "localhost",
  database: "db_siswa",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log('database connected....');

  app.get("/", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, result) => {
      if (err) throw err;

      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: "DAFTAR MURID KELAS" });
    });
  });

  app.post("/tambah", (req, res) => {
    const insertSql = `INSERT INTO user (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}')`;

    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(2000, () => {
  console.log('server ready');
});
