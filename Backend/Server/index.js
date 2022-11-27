const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/users");
const bookModel = require("./models/books");
const borrowModel = require("./models/borrow");
const librarianModel = require("./models/librarian");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
const url = process.env.DATABASE;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Server is up");
});

app.post("/api/v1/librarian/signin", (req, res) => {
  const { librarianid, password } = req.body;

  librarianModel.findOne(
    { librarianid: librarianid },
    function (err, foundUser) {
      if (err) {
        console.log(err);
        res.json({ status: "error" });
      } else {
        if (foundUser) {
          if (foundUser.librarianpassword === password) {
            res.status(200).json({ status: "success" });
            // console.log("success")
          } else {
            res.status(400).json({ status: "fail" });
          }
        } else {
          res.status(400).json({ status: "fail" });
          console.log("notfound");
        }
      }
    }
  );
});

app.get("/api/v1/librarian", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    var data = await librarianModel.find();
  } catch (e) {
    res.send(e);
  }
  //    console.log(data)
  res.json(data);
});

app.get("/api/v1/users", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    var data = await userModel.find();
  } catch (e) {
    res.send(e);
  }
  res.json(data);
});

app.patch("/api/v1/books/available", async (req, res) => {
  try {
    const id = req.body.id;
    const findbook = await bookModel.findOne({ bookid: id });
    const uniqueid = findbook._id;
    uniqueid.toString();
    const update = await bookModel.findByIdAndUpdate(uniqueid, {
      bookavailable: "false",
    });
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
    console.log(error);
  }
});

app.patch("/api/v1/returnbook/bookid", async (req, res) => {
  try {
    const id = req.body.id;
    const findbook = await bookModel.findOne({ bookid: id });
    const uniqueid = findbook._id;
    const update = await bookModel.findByIdAndUpdate(uniqueid, {
      bookavailable: "true",
    });
    const findborrow = await borrowModel.findOne({ borrowbyid: id });
    const borrowuniqueid = findborrow._id;
    const deleteborrow = await borrowModel.findByIdAndDelete(borrowuniqueid);
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
    console.log(error);
  }
});

app.post("/api/v1/returnbook", (req, res) => {
  // console.log(req.body);
  const { bookid } = req.body;
  // console.log(bookid)
  borrowModel.findOne({ borrowbyid: bookid }, function (err, foundUser) {
    if (err) {
      console.log(err);
      res.json({ status: "error" });
    } else {
      if (foundUser) {
        res.json(foundUser);
      } else {
        res.json({ status: "fail" });
      }
    }
  });
});

app.patch("/api/v1/borrowbooks/approve", async (req, res) => {
  try {
    const id = req.body.id;
    const issuedate = req.body.issuedate;
    const returndate = req.body.returndate;
    const update = await borrowModel.findByIdAndUpdate(id, {
      borrowbyissue: "approved",
      borrowbyborrowdate: issuedate,
      borrowbyreturndate: returndate,
    });

    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
    console.log(error);
  }
});

app.patch("/api/v1/borrowbooks/disapprove", async (req, res) => {
  try {
    const id = req.body.id;
    const update = await borrowModel.findByIdAndUpdate(id, {
      borrowbyissue: "disapproved",
    });
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
  }
});

app.get("/api/v1/borrowbooks", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    var data = await borrowModel.find();
  } catch (e) {
    res.send(e);
  }
  //    console.log(data)
  res.json(data);
});

app.post("/api/v1/borrow", (req, res) => {
  // console.log(req.body);
  var myData = new borrowModel(req.body);
  // console.log(myData)
  myData
    .save()
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ status: "fail" });
    });
});

app.post("/api/v1/signin", (req, res) => {
  // console.log(req.body);
  const { memberid, password } = req.body;

  userModel.findOne({ memberid: memberid }, function (err, foundUser) {
    if (err) {
      console.log(err);
      res.json({ status: "error" });
    } else {
      if (foundUser) {
        if (foundUser.memberpassword === password) {
          res.status(200).json({ status: "success" });
          // console.log("success")
        } else {
          res.status(400).json({ status: "fail" });
        }
      } else {
        res.status(400).json({ status: "fail" });
        console.log("notfound");
      }
    }
  });
});

app.post("/api/borrow", (req, res) => {
  // console.log(req.body);
  var myData = new userModel(req.body);
  myData
    .save()
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch(() => {
      res.status(400).json({ status: "fail" });
    });
});

app.post("/api/v1/register", (req, res) => {
  // console.log(req.body);
  var myData = new userModel(req.body);
  myData
    .save()
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch(() => {
      res.status(400).json({ status: "fail" });
    });
});

app.post("/api/v1/addbook", (req, res) => {
  // console.log(req.body);
  var myData = new bookModel(req.body);
  myData
    .save()
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch(() => {
      res.status(400).json({ status: "fail" });
    });
});

app.patch("/api/v1/update-book/:uniqueid", async (req, res) => {
  try {
    const id = req.params.uniqueid;
    const data = req.body;
    const update = await bookModel.findByIdAndUpdate(id, data);
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
    console.log(error);
  }
});

app.get("/api/v1/updatebook/:bookid", async (req, res) => {
  var bookid = req.params.bookid;
  bookModel.findOne({ bookid: bookid }, function (err, foundUser) {
    if (err) {
      console.log(err);
      res.json({ status: "error" });
    } else {
      if (foundUser) {
        res.json(foundUser);
      }
    }
  });
});

app.get("/api/v1/members", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    var data = await userModel.find();
  } catch (e) {
    res.send(e);
  }
  //    console.log(data)
  res.json(data);
});

app.get("/api/v1/books", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    var data = await bookModel.find();
  } catch (e) {
    res.send(e);
  }
  //    console.log(data)
  res.json(data);
});

app.delete("/api/deletebook/:id", async (req, res) => {
  bookModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch((e) => {
      res.status(400).json({ status: "fail" });
      console.log(e);
    });
});

app.delete("/api/deletemember/:id", async (req, res) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch((e) => {
      res.status(400).json({ status: "fail" });
      console.log(e);
    });
});
app.listen(port, () => console.log(`App listening on port ${port}!`));
