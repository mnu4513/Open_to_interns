const mongooose = require('mongoose');
const ObjectId = mongooose.Schema.Types.ObjectId;

const internSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        unique: true,
        required: true,
        trim: true
    }, 
    collegeId: {
        type: ObjectId,
        required: true,
        ref: 'College'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongooose.model('Intern', internSchema);