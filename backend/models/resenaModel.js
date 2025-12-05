const mongoose = require('mongoose');

const resenaSchema = mongoose.Schema({
    // cada reseña va con un usuario asociado (autenticación requerida)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // materia o profesor reseñando
    profesor_o_materia: {
        type: String,
        required: [true, 'Por favor, indica el profesor o materia que estás reseñando.'],
    },
    // calificacion del 1 al 10
    calificacion: {
        type: Number,
        required: [true, 'Por favor, asigna una calificación del 1 al 10.'],
        min: 1,
        max: 10
    },
    // este espacio es para el comentario de la reseña
    comentario: { 
        type: String,
        required: [true, 'Por favor, agrega un comentario a tu reseña.']
    }
}, {
    // ordena por fecha de creación
    timestamps: true 
})

// hace que un usuario solo pueda dejar una reseña por profesor o materia
resenaSchema.index({ user: 1, profesor_o_materia: 1 }, { unique: true });


module.exports = mongoose.model('Resena', resenaSchema);