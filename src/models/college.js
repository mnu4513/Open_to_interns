const mongooose = require('mongoose');

const collegeSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    logoLink: {
        type: String,
        required: true,
        trim: true
    }, 
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongooose.model('College', collegeSchema);