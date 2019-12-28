const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true},
    surname: {
        type: String,
        required: true,
        trim: true},
    option: {
        type: String,
        required: true,
        trim: true},
    birthday: {
        type: Date,
        required: true},
    startDate: {
        type: Date,
        required: true},
    endDate: {
        type: Date,
        required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
