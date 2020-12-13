const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    ingr: [
      {
        name: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: false
        },
        unit: {
          type: String,
          required: false
        }
      }
    ],
    inst: [
      {
        name: {
          type: String,
          required: false
        },
        desc: {
          type: String,
          required: true
        },
        duration: {
          type: Number,
          required: false
        }
      }
    ],
    favourite: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = Recipe = mongoose.model("recipes", RecipeSchema);