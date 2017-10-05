const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog', {
    // promiseLibrary: global.Promise
})

const articleSchema = mongoose.Schema({
    title: String,
    content: String,
    tags: String,
    author: String
}, {
        timestamps: {
            // createdAt: 'created_at'
        }
    })

articleSchema.methods.success = function () {
    console.log('Article save success')

}

var Article = mongoose.model('article', articleSchema)

module.exports = Article