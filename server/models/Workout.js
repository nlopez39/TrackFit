const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const workoutSchema = new Schema({
  dayofWeek: {
    type: String,
    required: true,
  },

  bodyPart: {
    type: String,
    required: false,
    trim: true,
  },

  exercise: {
    type: String,
    required: true,
    trim: true,
  },
  workoutType: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },

  reps: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
