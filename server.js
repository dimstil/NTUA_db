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
    var selectQuery = "select book.isbn as \"ISBN\", title as \"Title\", pubYear as \"Published on\", numpages as \"No. of Pages\", pubName as \"Published by\", count(copies.isbn) as \"No. of Copies\" from book left join copies on book.ISBN=copies.ISBN"
    const orderBy = qdata["by"];
    delete qdata["by"];
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

    selectQuery += " group by book.ISBN";
    if(orderBy !== undefined) selectQuery += ` order by ${orderBy}`;
    selectQuery += ';';

    console.log(selectQuery);
    con.query(selectQuery, (err, result, fields) => {
      if (err) throw err;
      namesObj = {};
      orgNamesObj = {};
      prim_key=["ISBN"];
      fields.map((obj ,i) => {
        namesObj[i] = obj.name;
        orgNamesObj[i] = obj.orgName;
      });

      res.json({"prim_key":prim_key,"orgName":namesObj,"names":orgNamesObj,"result": result});
    });
  })
  .delete((req, res) => {
    console.log(req.query); 
  })
