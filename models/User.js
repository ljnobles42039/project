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
    },
    img: {
        type: String,
        default: 'https://icon-library.net/images/profile-png-icon/profile-png-icon-15.jpg'
    },
    sport: {
        type: String,
        enum : ['Basketball', 'Soccer', 'Futball', 'Tenis', 'Voleyball']
    },
    sport2: {
        type: String,
        enum : ['Basketball', 'Soccer', 'Futball', 'Tenis', 'Voleyball']
    },
    sport3: {
        type: String,
        enum : ['Basketball', 'Soccer', 'Futball', 'Tenis', 'Voleyball']
    },
});

const User = mongoose.model('User', UserSchema); // create const model from the Schema, and UserSchenma

module.exports = User //4  Export to allow it to be used in other files.
