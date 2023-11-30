const mongoose = require('mongoose');

const pinturaSchema = new mongoose.Schema({
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
    tamaño: {
        type: String,
        required: [true, 'Tamaño es requerido'],
        enum: ['pequeño','mediano', 'grande', 'extra grande'],
        trim: true
    },
    tipo: {
        type: String,
        required: [true, 'Tipo es requerido'],
        enum: ['unicolor','multicolor'],
        
        trim: true
    },
    colores: [{
        type: String,
        required: [true, 'Color es requerido'],
        trim: true
    }],
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

module.exports = mongoose.model('Pintura', pinturaSchema);
