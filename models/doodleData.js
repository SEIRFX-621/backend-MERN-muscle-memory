const mongoose = require('mongoose');
const { Schema } = mongoose;

const doodleDataSchema = new Schema({
    x: {
        type: Number,
        required: true,
        min: 0,
        max: 19,
        validate : {
            validator : Number.isInteger,
            message   : 'X: {VALUE} is not an integer value'
        }
    },
    y: {
        type: Number,
        required: true,
        min: 0,
        max: 19,
        validate : {
            validator : Number.isInteger,
            message   : 'Y: {VALUE} is not an integer value'
        }
    },
})

module.exports = doodleDataSchema;