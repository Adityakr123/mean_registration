const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    age: Number,
    gender: String,
    dob: Date
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
