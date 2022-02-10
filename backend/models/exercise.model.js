const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date,required: true},
    completed: {type: Boolean,required: false, default: false}
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;