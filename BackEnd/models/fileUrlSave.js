const mongoose = require('mongoose');

const fileUrls = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const FileUrls = mongoose.model('FileUrls', fileUrls);
module.exports = FileUrls;