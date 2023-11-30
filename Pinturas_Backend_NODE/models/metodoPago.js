const mongoose = require('mongoose');

const metodoPagoSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        unique: true,
        required: [true, 'Codigo es requerido'],
        trim: true
    },
    metodo: {
        type: String,
        required: [true, 'Metodo es requerido'],
        enum: ['efectivo','tarjeta','nequi', 'daviplata','pse'],
        trim: true
    },
});

module.exports = mongoose.model('MetodoPago', metodoPagoSchema);