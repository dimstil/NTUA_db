const mysql = require('mysql');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const url = require('url');

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
  database: "librarydb",
  port: "3306"
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.route('/book')
  .post((req, res) => {
    console.log(req.params);
    con.query(`insert into book(isbn, title, pubYear, numpages, pubName) values(\'${req.body.isbn}\', \'${req.body.title}\', ${req.body.pubYear}, ${req.body.numPage}, \'${req.body.pubName}\');`);
    console.log(req.body);
    res.send({ status: 'succ' });
  })
  .get((req, res) => {
    var qdata = JSON.parse(req.query.query);
    console.log(qdata);
    var selectQuery = "select book.isbn, title, pubYear, numpages, pubName, count(copies.isbn) from book left join copies on book.ISBN=copies.ISBN"
    if (Object.keys(qdata).length !== 0) {
      selectQuery += " where"
      for (x in qdata) {
        if (x === "isbn" || x === "title" || x === "pubName") {
          selectQuery += ` book.${x} like '%${qdata[x]}%' and`;
        }
        else {
          selectQuery += ` book.${x} =  ${qdata[x]}  and`;
        }
      }
      selectQuery = selectQuery.substring(0, selectQuery.length - 4);
    }
    selectQuery += " group by book.ISBN;";
    console.log(selectQuery);
    con.query(selectQuery, function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  })