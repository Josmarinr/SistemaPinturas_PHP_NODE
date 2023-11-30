const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: [true, 'Codigo es requerido'],
        unique: true,
        trim: true
    },
    nombre: {
        type: String,
        required: [true, 'Nombre es requerido'],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'Descripcion es requerido'],
        trim: true
    },
    cantidad: {
        type: Number,
        required: [true, 'Cantidad es requerido'],
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Cantidad debe ser un numero positivo');
            }
        }
    },
    precio: {
        type: Number,
        required: [true, 'Precio es requerido'],
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Precio debe ser un numero positivo');
            }
        }
    },
});

module.exports = mongoose.model('Producto', productoSchema);