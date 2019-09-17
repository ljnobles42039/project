const {model, Schema} = require('mongoose')

const eventSchema = new Schema(
  {
      title: String,
      description: String,
      date: Date,
      location: {
          ref: 'User',
          type: Schema.Types.ObjectId
      }
    
    },
  {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
  }
)

module.exports = model('Event', eventSchema)