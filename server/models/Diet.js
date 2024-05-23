const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const dietschema = new Schema({
  Food: {
    type: String,
    required: 'Enter what you ate',
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  Calorie: {
    type: Number,
    required: true,
    trim: true,
  },
  // Protine: {
  //   type: Number,
  //   required: false,
  //   trim: true,
  // },
  // Carbs: {
  //   type: Number,
  //   required: false,
  //   trim: true,
  // },
  // Sugar: {
  //   type: Number,
  //   required: false,
  //   trim: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Diet = model('Diet', dietschema);

module.exports = Diet;

