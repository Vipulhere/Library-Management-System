const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
    borrowbybooktitle: {
        type: String,
        required: true,
    },
    borrowbyid: {
        type: String,
        required: true,
    },
    borrowbymemberid: {
        type: String,
        required: true,
    },
    borrowbydays: {
        type: String,
        required: true,
    },
    borrowbyissue: {
        type: String,
        required: true,
    },
    borrowbyrequestdate: {
        type: String,
        required: true,
    },
    borrowbyborrowdate: {
        type: String,
    },
    borrowbyreturndate: {
        type: String,
    },
   fine: {
        type: String,
    },

   
});

const Borrow = mongoose.model("Borrow", BorrowSchema);

module.exports = Borrow;