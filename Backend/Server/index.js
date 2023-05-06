
// Require necessary packages and models
const express = require("express"); // Express web framework
const bodyParser = require("body-parser"); // Middleware to parse request bodies
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
const mongoose = require("mongoose"); // MongoDB Object Document Mapper
const userModel = require("./models/users"); // User model
const bookModel = require("./models/books"); // Book model
const borrowModel = require("./models/borrow"); // Borrow model
const librarianModel = require("./models/librarian"); // Librarian model
const dotenv = require("dotenv"); // Load environment variables from .env file
dotenv.config({ path: "./.env" });

// Create an instance of the Express web framework
const app = express();

// Set the port number that the server will listen on
const port = process.env.PORT || 3001;

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Connect to the MongoDB database
const url = process.env.DATABASE;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Set up error and open event listeners for the database connection
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Parse incoming request bodies as JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define a route for the root URL
app.get("/", function (req, res) {
  res.send("Server is up");
});

// Define a route for librarian sign-in
app.post("/api/v1/librarian/signin", (req, res) => {
  const { librarianid, password } = req.body;

  // Find a librarian with the specified ID
  librarianModel.findOne(
    { librarianid: librarianid },
    function (err, foundUser) {
      if (err) {
        console.log(err);
        res.json({ status: "error" });
      } else {
        if (foundUser) {
          // If the password matches, send a success status
          if (foundUser.librarianpassword === password) {
            res.status(200).json({ status: "success" });
          } else {
            // If the password does not match, send a fail status
            res.status(400).json({ status: "fail" });
          }
        } else {
          // If the librarian is not found, send a fail status
          res.status(400).json({ status: "fail" });
          console.log("notfound");
        }
      }
    }
  );
});

// Define a route to retrieve all librarians
app.get("/api/v1/librarian", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    var data = await librarianModel.find();
  } catch (e) {
    res.send(e);
  }
  res.json(data);
});

// Define a route to retrieve all users
app.get("/api/v1/users", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    var data = await userModel.find();
  } catch (e) {
    res.send(e);
  }
  res.json(data);
});


// update book availability to false for given book id
app.patch("/api/v1/books/available", async (req, res) => {
  try {
    const id = req.body.id; // get book id from request body
    const findbook = await bookModel.findOne({ bookid: id }); // find book in database by id
    const uniqueid = findbook._id; // get unique id of book
    uniqueid.toString(); // convert unique id to string
    const update = await bookModel.findByIdAndUpdate(uniqueid, {
      bookavailable: "false", // set bookavailability to false
    });
    res.json({ status: "success" }); // send success response
  } catch (error) {
    res.json({ status: "fail" }); // send fail response
    console.log(error); // log error to console
  }
});

// update book availability to true for given book id and delete borrow record
app.patch("/api/v1/returnbook/bookid", async (req, res) => {
  try {
    const id = req.body.id; // get book id from request body
    const findbook = await bookModel.findOne({ bookid: id }); // find book in database by id
    const uniqueid = findbook._id; // get unique id of book
    const update = await bookModel.findByIdAndUpdate(uniqueid, {
      bookavailable: "true", // set bookavailability to true
    });
    const findborrow = await borrowModel.findOne({ borrowbyid: id }); // find borrow record by book id
    const borrowuniqueid = findborrow._id; // get unique id of borrow record
    const deleteborrow = await borrowModel.findByIdAndDelete(borrowuniqueid); // delete borrow record from database
    res.json({ status: "success" }); // send success response
  } catch (error) {
    res.json({ status: "fail" }); // send fail response
    console.log(error); // log error to console
  }
});

// check if book is borrowed by given book id
app.post("/api/v1/returnbook", (req, res) => {
  const { bookid } = req.body; // get book id from request body
  borrowModel.findOne({ borrowbyid: bookid }, function (err, foundUser) { // find borrow record by book id
    if (err) {
      console.log(err); // log error to console
      res.json({ status: "error" }); // send error response
    } else {
      if (foundUser) { // if borrow record is found
        res.json(foundUser); // send borrow record as response
      } else {
        res.json({ status: "fail" }); // send fail response if borrow record not found
      }
    }
  });
});

// update borrow record to approved and set issue and return dates for given borrow id
// This endpoint approves a book borrowing request
app.patch("/api/v1/borrowbooks/approve", async (req, res) => {
  try {
    const id = req.body.id; // Get the ID of the borrowing request
    const issuedate = req.body.issuedate; // Get the issue date
    const returndate = req.body.returndate; // Get the return date
    // Update the borrowing request with the new information
    const update = await borrowModel.findByIdAndUpdate(id, {
      borrowbyissue: "approved",
      borrowbyborrowdate: issuedate,
      borrowbyreturndate: returndate,
    });
    res.json({ status: "success" }); // Return a success message
  } catch (error) {
    res.json({ status: "fail" }); // Return a fail message
    console.log(error); // Log the error
  }
});

// This endpoint disapproves a book borrowing request
app.patch("/api/v1/borrowbooks/disapprove", async (req, res) => {
  try {
    const id = req.body.id; // Get the ID of the borrowing request
    // Update the borrowing request with the new information
    const update = await borrowModel.findByIdAndUpdate(id, {
      borrowbyissue: "disapproved",
    });
    res.json({ status: "success" }); // Return a success message
  } catch (error) {
    res.json({ status: "fail" }); // Return a fail message
  }
});

// This endpoint retrieves all book borrowing requests
app.get("/api/v1/borrowbooks", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*"); // Allow cross-origin requests
  try {
    var data = await borrowModel.find(); // Get all the borrowing requests from the database
  } catch (e) {
    res.send(e); // Return an error message
  }
  res.json(data); // Return the borrowing requests as JSON
});

// This endpoint adds a new book borrowing request to the database
app.post("/api/v1/borrow", (req, res) => {
  var myData = new borrowModel(req.body); // Create a new borrowing request object from the request body
  myData
    .save() // Save the new borrowing request to the database
    .then(() => {
      res.status(200).json({ status: "success" }); // Return a success message
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ status: "fail" }); // Return a fail message
    });
});
app.post("/api/v1/signin", (req, res) => {
  // Get memberid and password from request body
  const { memberid, password } = req.body;

  // Look for a user with the given memberid
  userModel.findOne({ memberid: memberid }, function (err, foundUser) {
    if (err) {
      console.log(err);
      res.json({ status: "error" });
    } else {
      // If user is found, check if password matches
      if (foundUser) {
        if (foundUser.memberpassword === password) {
          res.status(200).json({ status: "success" });
        } else {
          res.status(400).json({ status: "fail" });
        }
      } else {
        // If user is not found, return fail status
        res.status(400).json({ status: "fail" });
        console.log("notfound");
      }
    }
  });
});

app.post("/api/borrow", (req, res) => {
  // Create a new user model instance with request body
  var myData = new userModel(req.body);
  // Save the new user to the database
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
  // Create a new user model instance with request body
  var myData = new userModel(req.body);
  // Save the new user to the database
  myData
    .save()
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch(() => {
      res.status(400).json({ status: "fail" });
    });
});

// Endpoint to add a book to the library
app.post("/api/v1/addbook", (req, res) => {
  // Create a new instance of the book model using the request body
  var myData = new bookModel(req.body);

  // Save the new book instance to the database
  myData
    .save()
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch(() => {
      res.status(400).json({ status: "fail" });
    });
});

// Endpoint to update book details
app.patch("/api/v1/update-book/:uniqueid", async (req, res) => {
  try {
    // Get the book unique ID and updated data from the request body
    const id = req.params.uniqueid;
    const data = req.body;

    // Find the book in the database by ID and update its details
    const update = await bookModel.findByIdAndUpdate(id, data);

    // Return a success status
    res.json({ status: "success" });
  } catch (error) {
    // Return a fail status and log any errors
    res.json({ status: "fail" });
    console.log(error);
  }
});

// Endpoint to retrieve a specific book from the library
app.get("/api/v1/updatebook/:bookid", async (req, res) => {
  // Get the book ID from the request parameters
  var bookid = req.params.bookid;

  // Find the book in the database by ID
  bookModel.findOne({ bookid: bookid }, function (err, foundUser) {
    if (err) {
      console.log(err);
      res.json({ status: "error" });
    } else {
      if (foundUser) {
        // Return the book object
        res.json(foundUser);
      }
    }
  });
});

// Endpoint to retrieve all registered members
app.get("/api/v1/members", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    // Get all user data from the database
    var data = await userModel.find();
  } catch (e) {
    res.send(e);
  }
  // Return the user data as a JSON object
  res.json(data);
});

// Endpoint to retrieve all books in the library
app.get("/api/v1/books", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    // Get all book data from the database
    var data = await bookModel.find();
  } catch (e) {
    res.send(e);
  }
  // Return the book data as a JSON object
  res.json(data);
});
app.delete("/api/deletebook/:id", async (req, res) => {
  // Find the book by its ID and delete it from the database
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
  // Find the member by their ID and delete them from the database
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

// Start the server and listen on the specified port
app.listen(port, () => console.log(`App listening on port ${port}!`));





















//extra work-never mind






// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const userModel = require("./models/users");
// const bookModel = require("./models/books");
// const borrowModel = require("./models/borrow");
// const librarianModel = require("./models/librarian");
// const dotenv = require("dotenv");
// dotenv.config({ path: "./.env" });

// const app = express();
// const port = process.env.PORT || 3001;
// app.use(cors());
// const url = process.env.DATABASE;

// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get("/", function (req, res) {
//   res.send("Server is up");
// });

// app.post("/api/v1/librarian/signin", (req, res) => {
//   const { librarianid, password } = req.body;

//   librarianModel.findOne(
//     { librarianid: librarianid },
//     function (err, foundUser) {
//       if (err) {
//         console.log(err);
//         res.json({ status: "error" });
//       } else {
//         if (foundUser) {
//           if (foundUser.librarianpassword === password) {
//             res.status(200).json({ status: "success" });
//             // console.log("success")
//           } else {
//             res.status(400).json({ status: "fail" });
//           }
//         } else {
//           res.status(400).json({ status: "fail" });
//           console.log("notfound");
//         }
//       }
//     }
//   );
// });

// app.get("/api/v1/librarian", async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   try {
//     var data = await librarianModel.find();
//   } catch (e) {
//     res.send(e);
//   }
//   //    console.log(data)
//   res.json(data);
// });

// app.get("/api/v1/users", async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   try {
//     var data = await userModel.find();
//   } catch (e) {
//     res.send(e);
//   }
//   res.json(data);
// });

// app.patch("/api/v1/books/available", async (req, res) => {
//   try {
//     const id = req.body.id;
//     const findbook = await bookModel.findOne({ bookid: id });
//     const uniqueid = findbook._id;
//     uniqueid.toString();
//     const update = await bookModel.findByIdAndUpdate(uniqueid, {
//       bookavailable: "false",
//     });
//     res.json({ status: "success" });
//   } catch (error) {
//     res.json({ status: "fail" });
//     console.log(error);
//   }
// });

// app.patch("/api/v1/returnbook/bookid", async (req, res) => {
//   try {
//     const id = req.body.id;
//     const findbook = await bookModel.findOne({ bookid: id });
//     const uniqueid = findbook._id;
//     const update = await bookModel.findByIdAndUpdate(uniqueid, {
//       bookavailable: "true",
//     });
//     const findborrow = await borrowModel.findOne({ borrowbyid: id });
//     const borrowuniqueid = findborrow._id;
//     const deleteborrow = await borrowModel.findByIdAndDelete(borrowuniqueid);
//     res.json({ status: "success" });
//   } catch (error) {
//     res.json({ status: "fail" });
//     console.log(error);
//   }
// });

// app.post("/api/v1/returnbook", (req, res) => {
//   // console.log(req.body);
//   const { bookid } = req.body;
//   // console.log(bookid)
//   borrowModel.findOne({ borrowbyid: bookid }, function (err, foundUser) {
//     if (err) {
//       console.log(err);
//       res.json({ status: "error" });
//     } else {
//       if (foundUser) {
//         res.json(foundUser);
//       } else {
//         res.json({ status: "fail" });
//       }
//     }
//   });
// });

// app.patch("/api/v1/borrowbooks/approve", async (req, res) => {
//   try {
//     const id = req.body.id;
//     const issuedate = req.body.issuedate;
//     const returndate = req.body.returndate;
//     const update = await borrowModel.findByIdAndUpdate(id, {
//       borrowbyissue: "approved",
//       borrowbyborrowdate: issuedate,
//       borrowbyreturndate: returndate,
//     });

//     res.json({ status: "success" });
//   } catch (error) {
//     res.json({ status: "fail" });
//     console.log(error);
//   }
// });

// app.patch("/api/v1/borrowbooks/disapprove", async (req, res) => {
//   try {
//     const id = req.body.id;
//     const update = await borrowModel.findByIdAndUpdate(id, {
//       borrowbyissue: "disapproved",
//     });
//     res.json({ status: "success" });
//   } catch (error) {
//     res.json({ status: "fail" });
//   }
// });

// app.get("/api/v1/borrowbooks", async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   try {
//     var data = await borrowModel.find();
//   } catch (e) {
//     res.send(e);
//   }
//   //    console.log(data)
//   res.json(data);
// });

// app.post("/api/v1/borrow", (req, res) => {
//   // console.log(req.body);
//   var myData = new borrowModel(req.body);
//   // console.log(myData)
//   myData
//     .save()
//     .then(() => {
//       res.status(200).json({ status: "success" });
//     })
//     .catch((e) => {
//       console.log(e);
//       res.status(400).json({ status: "fail" });
//     });
// });

// app.post("/api/v1/signin", (req, res) => {
//   // console.log(req.body);
//   const { memberid, password } = req.body;

//   userModel.findOne({ memberid: memberid }, function (err, foundUser) {
//     if (err) {
//       console.log(err);
//       res.json({ status: "error" });
//     } else {
//       if (foundUser) {
//         if (foundUser.memberpassword === password) {
//           res.status(200).json({ status: "success" });
//           // console.log("success")
//         } else {
//           res.status(400).json({ status: "fail" });
//         }
//       } else {
//         res.status(400).json({ status: "fail" });
//         console.log("notfound");
//       }
//     }
//   });
// });

// app.post("/api/borrow", (req, res) => {
//   // console.log(req.body);
//   var myData = new userModel(req.body);
//   myData
//     .save()
//     .then(() => {
//       res.status(200).json({ status: "success" });
//     })
//     .catch(() => {
//       res.status(400).json({ status: "fail" });
//     });
// });

// app.post("/api/v1/register", (req, res) => {
//   // console.log(req.body);
//   var myData = new userModel(req.body);
//   myData
//     .save()
//     .then(() => {
//       res.status(200).json({ status: "success" });
//     })
//     .catch(() => {
//       res.status(400).json({ status: "fail" });
//     });
// });

// app.post("/api/v1/addbook", (req, res) => {
//   // console.log(req.body);
//   var myData = new bookModel(req.body);
//   myData
//     .save()
//     .then(() => {
//       res.status(200).json({ status: "success" });
//     })
//     .catch(() => {
//       res.status(400).json({ status: "fail" });
//     });
// });

// app.patch("/api/v1/update-book/:uniqueid", async (req, res) => {
//   try {
//     const id = req.params.uniqueid;
//     const data = req.body;
//     const update = await bookModel.findByIdAndUpdate(id, data);
//     res.json({ status: "success" });
//   } catch (error) {
//     res.json({ status: "fail" });
//     console.log(error);
//   }
// });

// app.get("/api/v1/updatebook/:bookid", async (req, res) => {
//   var bookid = req.params.bookid;
//   bookModel.findOne({ bookid: bookid }, function (err, foundUser) {
//     if (err) {
//       console.log(err);
//       res.json({ status: "error" });
//     } else {
//       if (foundUser) {
//         res.json(foundUser);
//       }
//     }
//   });
// });

// app.get("/api/v1/members", async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   try {
//     var data = await userModel.find();
//   } catch (e) {
//     res.send(e);
//   }
//   //    console.log(data)
//   res.json(data);
// });

// app.get("/api/v1/books", async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   try {
//     var data = await bookModel.find();
//   } catch (e) {
//     res.send(e);
//   }
//   //    console.log(data)
//   res.json(data);
// });

// app.delete("/api/deletebook/:id", async (req, res) => {
//   bookModel
//     .findByIdAndDelete(req.params.id)
//     .then(() => {
//       res.status(200).json({ status: "success" });
//     })
//     .catch((e) => {
//       res.status(400).json({ status: "fail" });
//       console.log(e);
//     });
// });

// app.delete("/api/deletemember/:id", async (req, res) => {
//   userModel
//     .findByIdAndDelete(req.params.id)
//     .then(() => {
//       res.status(200).json({ status: "success" });
//     })
//     .catch((e) => {
//       res.status(400).json({ status: "fail" });
//       console.log(e);
//     });
// });
// app.listen(port, () => console.log(`App listening on port ${port}!`));


