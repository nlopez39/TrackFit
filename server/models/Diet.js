const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const dietSchema = new Schema({
  food: {
    type: String,
    required: "Enter what you ate",
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  calories: {
    type: Number,
    required: true,
    trim: true,
  },
  carbs: {
    type: Number,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Diet = model("Diet", dietSchema);

module.exports = Diet;
