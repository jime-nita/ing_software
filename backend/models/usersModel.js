const mongoose = require('mongoose');   

const userSchema = mongoose.Schema ({
    nombre: {
        type: String,
        required: [true, 'Porfavor, teclea tu nombre']
    },

    email: {
        type: String,
        required: [true, 'Porfavor, teclea tu email'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Porfavor, teclea tu password']
    },  

    esAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)
