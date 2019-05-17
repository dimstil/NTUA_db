const mysql = require('mysql');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

app.listen(port);

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "librarydb"
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.route('/book')
.post((req, res) => {
  con.query(`insert into book(isbn, title, pubYear, numpages, pubName) values(\'${req.body.isbn}\', \'${req.body.title}\', ${req.body.pubYear}, ${req.body.numPage}, \'${req.body.pubName}\');`);  
  console.log(req.body);
  res.send({status: 'succ'});
})
.get((req, res) => {

})
