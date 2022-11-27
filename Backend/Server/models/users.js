const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    membername: {
        type: String,
        required: true,
    },
    memberid: {
        type: String,
        required: true,
    },
    memberaddress: {
        type: String,
        required: true,
    },
    memberprofession: {
        type: String,
        required: true,
    },
    memberjoindate: {
        type: String,
        required: true,
    },
    memberexpiredate: {
        type: String,
        required: true,
    },
    memberpassword: {
        type: String,
        required: true,
    },
    registrationtime: {
        type: String,
        default: new Date().toLocaleString()
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;