const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "newdatabase"
});

connection.connect((error) => {
  if (error)
      throw error;
  console.log("Connected to the database");
})

app.post('/signup', (req, res) => {
  console.log(req.body);
  const sql = "INSERT INTO newtable (name, email, password) VALUES (?, ?, ?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password
  ]
  connection.query(sql, values, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  })
})
app.post('/login', (req, res) => {
  console.log(req.body);
  const sql = "SELECT * FROM newtable WHERE email = ? AND password = ?";

  connection.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  })
})

app.listen(8081, () => {
  console.log("listening");
})

