const express = require("express");
const app = express();
const port = 3002;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "Api get ready", "sukses", res);
});

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "mahasiswa get list", res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "get detail mahasiswa", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;

  console.log(req.body);
  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES ('${nim}', '${namaLengkap}', '${kelas}', '${alamat}')`;
  db.query(sql, () => {
    if (err) response(500, "invalid", "erorr", res);
    if (fields?.affectedRows) {
      response(200, fields.insertID, "Data added Sukses", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;
  const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = '${nim}'`;

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "eror", res);
    if (fields?.affectedRows) response(200, "update test", "INI PUT ATAU UPDATE DATA", res);
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, () => {
    if (err) response(500, "invalid", "eror", res);
    console.log(fields);
  });
  response(200, "delete test", "delete data", res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
