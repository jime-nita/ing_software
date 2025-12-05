const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    nombre: {
        type: String,
        required: [true, 'Por favor, introduce el nombre del producto/emprendimiento.']
    },
    descripcion: {
        type: String,
        required: [true, 'Una descripción ayuda a vender.'],
    },
    precio: {
        type: Number,
        required: [true, 'Indica el precio del producto.'],
        min: 0
    },
    contacto: {
        type: String,
        required: [true, 'Indica un método de contacto (ej: WhatsApp, Instagram).']
    },
    categoria: {
        type: String,
        enum: ['Material', 'Servicio', 'Comida', 'Otro'],
        default: 'Material'
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Producto', productoSchema);