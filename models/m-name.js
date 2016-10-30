let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/blog');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("we're connected!");
// });
var nameSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    salt: {
        type: Number,
        default: Math.floor(Math.random() * 1000000)
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});
// Math.floor(Math.random() * 1000000)
nameSchema.statics.findByName = (name) => {
    return this.findOne({
        name: name
    });
};

var nameModel = mongoose.model('name', nameSchema);

// var nameEntity = new nameModel({
//     name: 'Tom',
//     email: '2235025068@qq.com',
//     password: 'wjs123456',
//     // salt: Math.floor(Math.random() * 1000000),

// });
// nameEntity.save(() => {
//     console.log("saved!");
// });

// nameModel.find({
//     name: "om"
// }, (err, docs) => {
//     if (docs[0]) {
//         console.log(1);
//         console.log(docs);
//     } else {
//         console.log(0);
//     }
// })

module.exports = nameModel;