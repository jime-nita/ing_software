const mongoose = require('mongoose');

const publicacionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    titulo: {
        type: String,
        required: [true, 'El título de la publicación es obligatorio.']
    },
    contenido: {
        type: String,
        required: [true, 'El contenido de la publicación es obligatorio.'],
    },
    tipo: {
        type: String,
        required: true,
        enum: ['Tip', 'Evento', 'Anuncio'],
        default: 'Anuncio'
    },
    fecha_evento: {
        type: Date,
        required: function() { return this.tipo === 'Evento'; }
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Publicacion', publicacionSchema);