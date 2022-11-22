const mongoose = require('mongoose');
const { Schema } = mongoose;
const DoodleDataSchema = require('./doodleData');


const doodleVersionSchema = new Schema({
    version: {
        type: Number,
        required: true,
        min: 0,
        validate : {
            validator : Number.isInteger,
            message   : 'Version: {VALUE} is not an integer value'
        }
    },
    doodleData: [DoodleDataSchema]
})

const DoodleVersion = mongoose.model('DoodleVersion', doodleVersionSchema);

module.exports = DoodleVersion;