const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const workoutTypes = ['At Home', 'Free Weights', 'Cables', 'Cardio'];

const workoutSchema = new Schema({
    BodyPart: {
        type: String,
        required: false,
        trim: true,
    },

    Exercise: {
        type: String,
        required: true,
        trim: true,
    },
    workoutType: {
        type: String,
        required: true,
        enum: workoutTypes
    },
    Sets: {
        type: Number,
        required: true,
    },

    Reps: {
        type: String,
        required: true,
    },

    Weight: {
        type: String,
        required: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;