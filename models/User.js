const mongoose = require('mongoose') //1  Bring in Mongoose


const UserSchema = new mongoose.Schema({ //2 Crete Schema
    name: { //3Pass in objects with all the fields
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
    status: {
        type: String,
        enum: ["Pending Confirmation", "Active"],
        default: "Pending Confirmation"
    },
    date: {
        type: Date,
        default: Date.now
    },
    img: {
        type: String,
        default: 'https://peoplepng.com/wp-content/uploads/2019/04/profile-pic-png-3.png'
    },
    description: String,
    sport1: {
        type: String,
        enum: ['Soccer', 'Basketball', 'Volleyball', 'Tennis', 'Football']
    },
    sport2: {
        type: String,
        enum: ['Soccer', 'Basketball', 'Volleyball', 'Tennis', 'Football']
    },
    sport3: {
        type: String,
        enum: ['Soccer', 'Basketball', 'Volleyball', 'Tennis', 'Football']
    }
});

const User = mongoose.model('User', UserSchema); // create const model from the Schema, and UserSchenma

module.exports = User //4  Export to allow it to be used in other files.