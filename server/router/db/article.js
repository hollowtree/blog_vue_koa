const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog', {
    // promiseLibrary: global.Promise
})

const articleSchema = mongoose.Schema({
    title: String,
    content: String,
    tags: String,
    author: String,
    // --- 1 正常，0 已删除，2 草稿
    kind: { type: Number, default: 1 }
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