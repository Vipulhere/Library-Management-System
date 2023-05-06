const mongoose = require("mongoose");

// Define the Borrow schema using Mongoose
const BorrowSchema = new mongoose.Schema({
  // Book title being borrowed
  borrowbybooktitle: {
    type: String,
    required: true,
  },
  // Unique ID of the book being borrowed
  borrowbyid: {
    type: String,
    required: true,
  },
  // ID of the member who is borrowing the book
  borrowbymemberid: {
    type: String,
    required: true,
  },
  // Number of days the book is borrowed for
  borrowbydays: {
    type: String,
    required: true,
  },
  // Whether the book is issued or not
  borrowbyissue: {
    type: String,
    required: true,
  },
  // Date the borrow request is made
  borrowbyrequestdate: {
    type: String,
    required: true,
  },
  // Date the book is borrowed
  borrowbyborrowdate: {
    type: String,
  },
  // Date the book is returned
  borrowbyreturndate: {
    type: String,
  },
  // Fine charged for late return of book
  fine: {
    type: String,
  },
});

// Create a Mongoose model for Borrow using the defined schema
const Borrow = mongoose.model("Borrow", BorrowSchema);

// Export the model so it can be used in other modules
module.exports = Borrow;



// const mongoose = require("mongoose");

// const BorrowSchema = new mongoose.Schema({
//     borrowbybooktitle: {
//         type: String,
//         required: true,
//     },
//     borrowbyid: {
//         type: String,
//         required: true,
//     },
//     borrowbymemberid: {
//         type: String,
//         required: true,
//     },
//     borrowbydays: {
//         type: String,
//         required: true,
//     },
//     borrowbyissue: {
//         type: String,
//         required: true,
//     },
//     borrowbyrequestdate: {
//         type: String,
//         required: true,
//     },
//     borrowbyborrowdate: {
//         type: String,
//     },
//     borrowbyreturndate: {
//         type: String,
//     },
//    fine: {
//         type: String,
//     },

   
// });

// const Borrow = mongoose.model("Borrow", BorrowSchema);

// module.exports = Borrow;