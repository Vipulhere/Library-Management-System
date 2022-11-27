const mongoose = require("mongoose");

const LibrarianSchema = new mongoose.Schema({
    librarianid: {
        type: String,
        required: true,
    },
    librarianname: {
        type: String,
        required: true,
    },
    librarianaddress: {
        type: String,
        required: true,
    },
    librarianpassword: {
        type: String,
        required: true,
    },
});

const Librarian = mongoose.model("Librarian", LibrarianSchema);

module.exports = Librarian;