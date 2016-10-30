let mongoose = require('mongoose');

var logSchema = mongoose.Schema({
    name: String,
    title: {
        type: String,
        default:'未命名'
    },
    log: String,
    logHtml:String,
    createDate: {
        type: Date,
        default: Date.now
    }
});
// Math.floor(Math.random() * 1000000)
// logSchema.statics.findBylog = (log) => {
//     return this.findOne({
//         log: log
//     });
// };

var logModel = mongoose.model('log', logSchema);

module.exports = logModel;