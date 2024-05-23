const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const achiveschema = new Schema({


    achiveTitle: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
        trim: true
    },
    achiveContent: {
        type: String,
        required: false,
        maxlength: 150,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
            },
            commentAuthor: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],



})