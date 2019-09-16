const mongoose = require('mongoose') //1  Bring in Mongoose


const UserSchema = new mongoose.Schema ({  //2 Crete Schema
    name: {                                 //3Pass in objects with all the fields
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema); // create const model from the Schema, and UserSchenma

module.exports = User //4  Export to allow it to be used in other files.
