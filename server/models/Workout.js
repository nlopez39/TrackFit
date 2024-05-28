const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const workoutTypes = ["At Home", "Free Weights", "Cables", "Cardio"];

const workoutSchema = new Schema({
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
    enum: workoutTypes,
  },
  sets: {
    type: Number,
    required: true,
  },

  reps: {
    type: String,
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
