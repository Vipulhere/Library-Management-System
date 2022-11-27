const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    bookid: {
        type: String,
        required: true,
    },
    booktitle: {
        type: String,
        required: true,
    },
    bookdesc: {
        type: String,
        required: true,
    },
    bookauthor: {
        type: String,
        required: true,
    },
    bookprice: {
        type: String,
        required: true,
    },
    bookavailable: {
        type: String,
        required: true,
    },
    bookimgurl: {
        type: String,
        required: true,
    },
    bookaddedtime: {
        type: String,
        default: new Date().toLocaleString()
    },
});

const Books = mongoose.model("Book", BookSchema);

module.exports = Books;