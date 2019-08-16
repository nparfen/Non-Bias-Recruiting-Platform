const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new mongoose.Schema({
    role: String,
    linkedinId: String,
    email: String,
    pwd: String,
    data: Object
}, {
    timestamps: true
})

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema)