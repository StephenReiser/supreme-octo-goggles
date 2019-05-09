const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    name: {type: String, required: true},
    completed: {type: Boolean, default: false},
    description: {type: String},
    tags: [{type: String}]
})

module.exports = mongoose.model('ToDo', todoSchema)