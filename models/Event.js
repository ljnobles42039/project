const mongoose = require('mongoose')

const {model, Schema} = require('mongoose')

const eventSchema = new Schema(
  {
      title: String,
      description: String,
      date: Date,
      time: String,
      sport: {
        type: String,
        enum: ['Soccer', 'Basketball', 'Volleyball', 'Tenis', 'Futball']
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
  },  
  {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
  }
)

const Event = mongoose.model('Event', eventSchema); 

module.exports = Event