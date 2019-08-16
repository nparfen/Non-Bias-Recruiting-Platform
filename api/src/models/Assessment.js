const mongoose = require('mongoose')

const assessmentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    data: Object
}, {
    timestamps: true
})

module.exports = mongoose.model('Assessment', assessmentSchema)