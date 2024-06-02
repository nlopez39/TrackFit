const { Schema, model } = require("mongoose");

const goalsSchema = new Schema({
  goal: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false, // By default, a workout is not completed
  },
});

const Goals = model("Goals", goalsSchema);

module.exports = Goals;
