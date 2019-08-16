const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const jobSchema = new mongoose.Schema({
    status: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    data: Object
}, {
    timestamps: true
})

jobSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Job', jobSchema)