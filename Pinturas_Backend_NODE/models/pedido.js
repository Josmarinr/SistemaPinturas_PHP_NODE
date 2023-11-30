const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        unique: true,
        required: [true, 'Codigo es requerido'],
        trim: true
    },
    usuario: {
        type: Number,
        required: [true, 'Usuario es requerido'],
        trim: true
    },
    fecha: {
        type: Date,
        required: [true, 'Fecha es requerido'],
        trim: true
    },
    metodoPago: {
        type: Number,
        required: [true, 'Metodo de pago es requerido'],
        trim: true
    },
    productos: [{
        type: Number,
        required: [true, 'Producto es requerido'],
        trim: true
    }],
    total: {
        type: Number,
        required: [true, 'Total es requerido'],
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Total debe ser un numero positivo');
            }
        }
    },
});

module.exports = mongoose.model('Pedido', pedidoSchema);