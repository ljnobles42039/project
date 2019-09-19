const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    title: {
      type: String,
      required: true
    },
    sport: {
        type: String,
        enum: ['Soccer', 'Basketball', 'Volleyball', 'Tenis', 'Futball']
    },
    location: {
      type: {
        type: String,
        default: "Point"
      },
      address: {
        type: String
      },
      coordinates: {
        type: [Number]
      }
    },
    description: {
      type: String
    },
    images: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
);

propertySchema.index({
  location: "2dsphere"
});

module.exports = mongoose.model("Property", propertySchema);