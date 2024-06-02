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

  caloriesBurned: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, // By default, a workout is not completed
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
