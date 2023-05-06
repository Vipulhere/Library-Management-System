const mongoose = require("mongoose");

// Create a new schema for librarian data
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

// Create a model based on the schema
const Librarian = mongoose.model("Librarian", LibrarianSchema);

// Export the model to make it available for use in other files
module.exports = Librarian;




// const mongoose = require("mongoose");

// const LibrarianSchema = new mongoose.Schema({
//     librarianid: {
//         type: String,
//         required: true,
//     },
//     librarianname: {
//         type: String,
//         required: true,
//     },
//     librarianaddress: {
//         type: String,
//         required: true,
//     },
//     librarianpassword: {
//         type: String,
//         required: true,
//     },
// });

// const Librarian = mongoose.model("Librarian", LibrarianSchema);

// module.exports = Librarian;