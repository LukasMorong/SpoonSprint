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
    procedure: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = Recipe = mongoose.model("recipies", RecipeSchema);