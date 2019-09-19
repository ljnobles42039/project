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
    }
      // location: {
      //     ref: ,
      //     type: Schema.Types.ObjectId
      // }
    },
  {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
  }
)

module.exports = model('Event', eventSchema)