const { Schema, model } = require("mongoose");

const goalsSchema = new Schema({
  goal: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
});

const Goals = model("Goals", goalsSchema);

module.exports = Goals;
