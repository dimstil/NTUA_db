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
  port: "3306",
  dateStrings: true
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

dateFrontToBack = (input) => {
  return `${input.substring(6, 10)}-${input.substring(0, 2)}-${input.substring(3, 5)}`
};

dateBackToFront = (input) => {
  return `${input.substring(5, 7)}/${input.substring(8, 10)}/${input.substring(0, 4)}`
};

app.route('/book')
  .post((req, res) => {
    con.query(`insert into book(isbn, title, pubYear, numpages, pubName) values(${Object.values(req.body).filter(field => field !== '').map(field => `\'${field}\'`).join(',')});`, (err) => {
      if (err) {
        console.log(err.errno)
        switch (err.errno) {
          case 1406:
            res.json({ errorMsg: "Input too long! Please try again." });
            break;
          case 3819:
          case 1265:
          case 1366:
            res.json({ errorMsg: "Invalid input field. Check input format" });
            break;
          case 1062:
            res.json({ errorMsg: "Book already exists!" });
            break;
          case 1136:
            res.json({ errorMsg: "Necessary fields are empty! Please fill all fields." });
            break;
          case 1452:
            res.json({ errorMsg: "Publisher does not exist! Please type a valid publisher name." });
            break;
          default:
            res.json({ errorMsg: "Error on insert. Please try again" });
            break;
        }
      }
      else {
        res.json({});
      }
    })
  })
  .get((req, res) => {
    var qdata = JSON.parse(req.query.query);
    console.log(qdata);
    var selectQuery = "select book.isbn as \"ISBN\", title as \"Title\", pubYear as \"Published on\", numpages as \"No. of Pages\", pubName as \"Published by\", count(copies.isbn) as \"No. of Copies\" from book left join copies on book.ISBN=copies.ISBN"

    const orderBy = qdata["by"];
    delete qdata["by"];

    const atLeastPages = qdata["numPages"];
    delete qdata["numPages"];

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
    if (atLeastPages !== undefined) selectQuery += ` having book.numPages >= ${atLeastPages}`;
    if (orderBy !== undefined) selectQuery += ` order by ${orderBy}`;
    selectQuery += ';';

    console.log(selectQuery);
    con.query(selectQuery, (err, result, fields) => {
      if (err) {
        switch (err.errno) {
          case 1054:
            res.json({ errorMsg: "Invalid input field! Please check input format." });
            break;
          default:
            res.json({ errorMsg: "Error on select. Please try again." });
            break;
        }
      }
      else {
        namesObj = {};
        orgNamesObj = {};
        prim_key = ["ISBN"];
        fields.map((obj, i) => {
          namesObj[i] = obj.name;
          orgNamesObj[i] = obj.orgName;
        });
        res.json({ "prim_key": prim_key, "orgName": orgNamesObj, "names": namesObj, "result": result });
      }
    });
  })
  .delete((req, res) => {
    const query = JSON.parse(req.query[0])
    console.log(query.ISBN)
    const deleteQuery = `delete from book where book.isbn = ${query.ISBN};`
    con.query(deleteQuery, (err) => {
      if (err) throw err;
      res.json({});
    });
  })
  .put((req, res) => {
    const fields = req.body.fields;
    const key = req.body.key;
    console.log(fields);

    var selectQuery = `update book set ${Object.keys(fields).map(field => `book.${field} = \'${fields[`${field}`]}\'`).join(',')} where book.isbn=\'${key.ISBN}\';`;

    console.log(selectQuery);
    con.query(selectQuery, (err) => {
      if (err) {
        switch (err.errno) {
          case 1406:
            res.json({ errorMsg: "Input too long! Please try again." });
            break;
          case 1054:
          case 1366:
            res.json({ errorMsg: "Invalid input field! Please check input format." });
            break;
          case 1062:
            res.json({ errorMsg: "Book already exists!." });
            break;
          default:
            res.json({ errorMsg: "Error on update. Please try again." });
            break;
        }
      }
      else {
        res.json({});
      }
    });
  });


app.route('/author')
  .post((req, res) => {
    req.body.aBirthdate === '' ? '' : dateFrontToBack(req.body.aBirthdate);
    con.query(`insert into author(ID, aFirst, aLast, aBirthdate) values(${Object.values(req.body).filter(field => field !== '').map(field => `\'${field}\'`).join(',')});`, (err) => {
      if (err) {
        switch (err.errno) {
          case 1406:
            res.json({ errorMsg: "Input too long! Please try again." });
            break;
          case 1054:
            res.json({ errorMsg: "Invalid input field! Please check input format." });
            break;
          case 1136:
            res.json({ errorMsg: "Necessary fields are empty! Please fill all fields." });
            break;
          case 1062:
            res.json({ errorMsg: "Author already exists!" });
            break;
          default:
            res.json({ errorMsg: "Error on insert. Please try again" });
            break;
        }
      }
      else {
        res.json({});
      }
    });
  })
  .get((req, res) => {
    var qdata = JSON.parse(req.query.query);
    var selectQuery = "select author.ID as \"ID\", aFirst as \"First Name\", aLast as \"Last Name\", aBirthdate as \"Date of Birth\", count(written_by.ISBN) as \"# Written Books\" from author left join written_by on author.ID=written_by.ID";
    const orderBy = qdata["by"];
    delete qdata["by"];
    if (Object.keys(qdata).length !== 0) {
      selectQuery += " where"
      for (x in qdata) {
        if (x === "ID") {
          selectQuery += ` author.${x} =  ${qdata[x]}  and`;
        }
        else if (x === "aBirthdate") {
          selectQuery += ` author.${x} =  date(\'${qdata[x]}\')  and`;
        }
        else {
          selectQuery += ` author.${x} like '%${qdata[x]}%' and`;
        }
      }
      selectQuery = selectQuery.substring(0, selectQuery.length - 4);
    }

    selectQuery += " group by author.ID";
    if (orderBy !== undefined) selectQuery += ` order by author.${orderBy}`;
    selectQuery += ';';

    console.log(selectQuery);
    con.query(selectQuery, (err, result, fields) => {
      if (err) {
        switch (err) {
          case 1054:
            res.json({ errorMsg: "Invalid input field! Please check input format." });
            break;
          default:
            res.json({ errorMsg: "Error on select. Please try again." });
            break;
        }
      }
      else {
        namesObj = {};
        orgNamesObj = {};
        prim_key = ["ID"];
        fields.map((obj, i) => {
          namesObj[i] = obj.name;
          orgNamesObj[i] = obj.orgName;
        });
        result.forEach(el => {
          el["Date of Birth"] = dateBackToFront(el["Date of Birth"]);
        });
        res.json({ "prim_key": prim_key, "orgName": orgNamesObj, "names": namesObj, "result": result });
      }
    });
  })
  .delete((req, res) => {
    const query = JSON.parse(req.query[0])
    const deleteQuery = `delete from author where author.ID = ${query.ID};`
    con.query(deleteQuery, (err) => {
      if (err) throw err;
      res.json({});
    });
  })
  .put((req, res) => {
    const fields = req.body.fields;
    const key = req.body.key;
    if (fields.aBirthdate) {
      fields.aBirthdate = dateFrontToBack(fields.aBirthdate);
    }
    console.log(fields);
    var selectQuery = `update author set ${Object.keys(fields).map(field => `author.${field} = \'${fields[`${field}`]}\'`).join(',')} where author.ID=\'${key.ID}\';`;


    console.log(selectQuery);
    con.query(selectQuery, (err) => {
      if (err) {
        switch (err.errno) {
          case 1406:
            res.json({ errorMsg: "Input too long! Please try again." });
            break;
          case 1054:
          case 1366:
          case 1292:
            res.json({ errorMsg: "Invalid input field! Please check input format." });
            break;
          case 1062:
            res.json({ errorMsg: "Author already exists!." });
            break;
          default:
            res.json({ errorMsg: "Error on update. Please try again." });
            break;
        }
      }
      else {
        res.json({});
      }
    });
  });

app.route('/member')
  .post((req, res) => {
    req.body.mBirthdate === '' ? '' : dateFrontToBack(req.body.mBirthdate);

    console.log(`insert into member(ID, mFirst, mLast, street, streetNumber, postalCode, mBirthdate) values(${Object.values(req.body).filter(field => field !== '').map(field => `\'${field}\'`).join(',')});`);
    con.query(`insert into member(ID, mFirst, mLast, street, streetNumber, postalCode, mBirthdate) values(${Object.values(req.body).filter(field => field !== '').map(field => `\'${field}\'`).join(',')});`, (err) => {
      if (err) {
        switch (err.errno) {
          case 1406:
            res.json({ errorMsg: "Input too long! Please try again." });
            break;
          case 1054:
          case 3819:
          case 1366:
            res.json({ errorMsg: "Invalid input field! Please check input format." });
            break;
          case 1136:
            res.json({ errorMsg: "Necessary fields are empty! Please fill all fields." });
            break;
          case 1062:
            res.json({ errorMsg: "Member already exists!" });
            break;
          default:
            res.json({ errorMsg: "Error on insert. Please try again" });
            break;
        }
      }
      else {
        res.json({});
      }
    });

  })
  .get((req, res) => {
    var qdata = JSON.parse(req.query.query);
    console.log(qdata);
    var selectQuery = "select member.ID as \"ID\", mFirst as \"First Name\", mLast as \"Last Name\", street as \"Street\", streetNumber as \"Street Number\", postalCode as \"Postal Code\", mBirthdate as \"Date of Birth\", count(borrows.ID) as \"# Borrowed Books\" from member left join  borrows on member.ID=borrows.ID";
    const orderBy = qdata["by"];
    delete qdata["by"];
    if (Object.keys(qdata).length !== 0) {
      selectQuery += " where"
      for (x in qdata) {
        if (x === "ID" || x === "streetNumber") {
          selectQuery += ` member.${x} =  ${qdata[x]}  and`;
        }
        else if (x === "mBirthdate") {
          selectQuery += ` member.${x} =  date(\'${qdata[x]}\')  and`;
        }
        else {
          selectQuery += ` member.${x} like '%${qdata[x]}%' and`;
        }
      }
      selectQuery = selectQuery.substring(0, selectQuery.length - 4);
    }

    selectQuery += " group by member.ID";
    if (orderBy !== undefined) selectQuery += ` order by member.${orderBy}`;
    selectQuery += ';';

    console.log(selectQuery);
    con.query(selectQuery, (err, result, fields) => {
      if (err) {
        switch (err.errno) {
          case 1054:
            res.json({ errorMsg: "Invalid input field! Please check input format." });
            break;
          default:
            res.json({ errorMsg: "Error on select. Please try again." });
            break;
        }
      }
      else {
        namesObj = {};
        orgNamesObj = {};
        prim_key = ["ID"];
        fields.map((obj, i) => {
          namesObj[i] = obj.name;
          orgNamesObj[i] = obj.orgName;
        });
        result.forEach(el => {
          el["Date of Birth"] = dateBackToFront(el["Date of Birth"]);
        });
        res.json({ "prim_key": prim_key, "orgName": orgNamesObj, "names": namesObj, "result": result });
      }
    });
  })
  .delete((req, res) => {
    const query = JSON.parse(req.query[0])
    const deleteQuery = `delete from member where member.ID = ${query.ID};`
    con.query(deleteQuery, (err) => {
      if (err) throw err;
      res.json({});
    });
  })
  .put((req, res) => {
    const fields = req.body.fields;
    const key = req.body.key;
    if (fields.mBirthdate) {
      fields.mBirthdate = dateFrontToBack(fields.mBirthdate);
    }

    console.log(fields);

    var selectQuery = `update member set ${Object.keys(fields).map(field => `member.${field} = \'${fields[`${field}`]}\'`).join(',')} where member.ID=${key.ID};`;

    console.log(selectQuery);
    con.query(selectQuery, (err) => {
      if (err) {
        switch (err.errno) {
          case 1406:
            res.json({ errorMsg: "Input too long! Please try again." });
            break;
          case 1054:
          case 1366:
            res.json({ errorMsg: "Invalid input field! Please check input format." });
            break;
          case 1062:
            res.json({ errorMsg: "Member already exists!." });
            break;
          default:
            res.json({ errorMsg: "Error on update. Please try again." });
            break;
        }
      }
      else {
        res.json({});
      }
    });
  });


app.route('/bookCopy')
  .post((req, res) => {
    console.log(`insert into copies(isbn) values(${req.body.params.ISBN});`)
    con.query(`insert into copies(isbn) values(${req.body.params.ISBN});`, () => {
      res.json({});
    })
  })
  .delete((req, res) => {
    const query = JSON.parse(req.query[0])
    con.query(`select max(copyNr) as maxNum from copies where copies.isbn like \'${query.ISBN}\';`, (err, result) => {
      con.query(`delete from copies where copies.isbn like \'${query.ISBN}\' and copies.copyNr=\'${result[0].maxNum}\';`, () => {
        res.json({});
      })
    });
  })

app.route('/query')
  .get((req, res) => {
    console.log(req.query.num);
    const queryNum = req.query.num
    let query = "";
    switch (Number(queryNum)) {
      case 1:
        query = `select count(*) as \'Number of Members\' from member;`;
        break;
      case 2:
        query = `select copies.isbn as \'ISBN\', count(*) as \'Number of Copies\' from copies group by copies.isbn;`;
        break;
      case 3:
        query = `select book.isbn as \'ISBN\', book.title as \'Title\', book.numpages as \'# of pages\' from book order by book.numpages desc;`;
        break;
      case 4:
        query = `select member.mFirst as \'First Name\', member.mLast as \'Last Name\', count(*) as \'Borrowed books\' from member inner join borrows on borrows.id = member.id where borrows.date_of_return is null group by member.id having count(*) >= 3;`;
        break;
      case 5:
        query = `select distinct borrows.isbn as \'ISBN\' from (select borrows.isbn as isbn, m1.ID as ID from member as m1 inner join borrows on m1.ID = borrows.ID) as borrowed_books_by inner join borrows on borrows.isbn = borrowed_books_by.isbn where borrows.ID  != borrowed_books_by.ID;`;
        break;
      case 6:
        query = `select book.isbn as \'ISBN\', book.title  as \'Title\', belongs_to.categoryName as \'Category\' from book left join belongs_to on book.isbn = belongs_to.isbn;`;
        break;
      case 7:
        query = `select book.isbn as \'ISBN\', book.title  as \'Title\', author.aFirst  as \'First Name\', author.aLast  as \'Last Name\' from book left join written_by on book.isbn = written_by.isbn inner join author on written_by.ID = author.ID;`;
        break;
      case 8:
        query = `select * from to_remind`;
        break;
    }
    con.query(query, (err, result, fields) => {
      namesObj = {};
      orgNamesObj = {};
      fields.map((obj, i) => {
        namesObj[i] = obj.name;
        orgNamesObj[i] = obj.orgName;
      });
      res.json({ "prim_key": "", "orgName": orgNamesObj, "names": namesObj, "result": result });
    })
  })

app.route('/view2')
  .post((req, res) => {
    console.log(`insert into employee_no_salary(eFirst, eLast) values(\'${req.body.eFirst}\', \'${req.body.eLast}\')`);
    con.query(`insert into employee_no_salary(eFirst, eLast) values(\'${req.body.eFirst}\', \'${req.body.eLast}\')`), err => {
      if (err) {
        switch (err.errno) {
          case 1406:
            res.json({ errorMsg: "Name too long! Please try again." });
            break;
          default:
            res.json({ errorMsg: "Error on insert! Please try again." });
            break;
        }
      }
      else {
        res.json({});
      }
    }
  })
  .get((req, res) => {
    var qdata = JSON.parse(req.query.query);
    console.log(qdata);
    var selectQuery = "select id as \'ID\', eFirst as \'First Name\' , eLast as \'Last Name\' from employee_no_salary";
    const orderBy = qdata["by"];
    delete qdata["by"];
    if (Object.keys(qdata).length !== 0) {
      selectQuery += " where"
      for (x in qdata) {
        if (x === "ID") {
          selectQuery += ` employee_no_salary.${x} =  ${qdata[x]}  and`;
        }
        else {
          selectQuery += ` employee_no_salary.${x} like '%${qdata[x]}%' and`;
        }
      }
      selectQuery = selectQuery.substring(0, selectQuery.length - 4);
    }

    selectQuery += " group by employee_no_salary.ID";
    if (orderBy !== undefined) selectQuery += ` order by employee_no_salary.${orderBy}`;
    selectQuery += ';';

    console.log(selectQuery);
    con.query(selectQuery, (err, result, fields) => {
      if (err) {
        switch (err.errno) {
          case 1054:
            res.json({ errorMsg: "Invalid input field! Please check input format." });
            break;
          default:
            res.json({ errorMsg: "Error on select. Please try again." });
            break;
        }
      }
      else {
        namesObj = {};
        orgNamesObj = {};
        prim_key = ["ID"];
        fields.map((obj, i) => {
          namesObj[i] = obj.name;
          orgNamesObj[i] = obj.orgName;
        });
        res.json({ "prim_key": prim_key, "orgName": orgNamesObj, "names": namesObj, "result": result });
      }
    });
  })
  .delete((req, res) => {
    const query = JSON.parse(req.query[0])
    con.query(`delete from employee_no_salary where employee_no_salary.id = \'${query.ID}\'`, (err) => {
      if (err) throw err;
      res.json({});
    });
  })
  .put((req, res) => {
    const fields = req.body.fields;
    const key = req.body.key;
    console.log(fields);
    var selectQuery = `update employee_no_salary set ${Object.keys(fields).map(field => `employee_no_salary.${field} = \'${fields[`${field}`]}\'`).join(',')} where employee_no_salary.ID=${key.ID};`;

    console.log(selectQuery);
    con.query(selectQuery, (err) => {
      if (err) {
        switch (err.errno) {
          case 1406:
            res.json({ errorMsg: "Input too long! Please try again." });
            break;
          case 1054:
          case 1366:
            res.json({ errorMsg: "Invalid input field! Please check input format." });
            break;
          case 1062:
            res.json({ errorMsg: "Employee already exists!." });
            break;
          default:
            res.json({ errorMsg: "Error on update. Please try again." });
            break;
        }
      }
      else {
        res.json({});
      }
    });
  });