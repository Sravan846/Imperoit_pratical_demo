const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    desc: {
        type: String,
        trim: true,
    },
    priority: {
        type: String,
        trim: true,
    },
    notes: [{
        type: String,
        trim: true,
    }],
    toDate: Date,
    shared: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userinfo'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userinfo'
    }
}, { timestamps: true })
module.exports = mongoose.model('taskinfo', taskSchema)
