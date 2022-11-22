const mongoose = require('mongoose');
const { Schema } = mongoose;

const doodleSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    doodleVersion: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoodleVersion'
    }]
})

const Doodle = mongoose.model('Doodle', doodleSchema);

module.exports = Doodle;