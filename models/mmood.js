let mongoose = require('mongoose');

var moodSchema = mongoose.Schema({
    name: String,
    mood: String,
    createDate: {
        type: Date,
        default: Date.now
    }
});
// Math.floor(Math.random() * 1000000)
moodSchema.statics.findBymood = (mood) => {
    return this.findOne({
        mood: mood
    });
};

var moodModel = mongoose.model('mood', moodSchema);

module.exports = moodModel;