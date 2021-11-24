const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: "",
    },
});

module.exports = model('User', userSchema);