const mongoose = require('mongoose');
const tareasSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    texto: {
        type: String,
        required: [true, 'Por favor agrega un texto <3']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Tarea', tareasSchema);