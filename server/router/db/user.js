const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    userId: String,
    passwd: String,
    token: String
}, {
        timestamps: {
        }
    })

userSchema.methods.success = function () {
    console.log('Create user success')
}

var User = mongoose.model('user', userSchema)

module.exports = User