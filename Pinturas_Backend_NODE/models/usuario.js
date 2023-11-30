const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    cedula: {
        type: Number,
        required: [true, 'Cedula es requerido'],
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Cedula debe ser un numero positivo');
            }
        }
    },
    nombre: {
        type: String,
        required: [true, 'Nombre es requerido'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email es requerido'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password es requerido'],
        trim: true,
        validate(value) {
            if(value.length < 6) {
                throw new Error('Password debe tener al menos 6 caracteres');
            }
        }
    },
    rol: {
        type: String,
        required: [true, 'Role es requerido'],
        trim: true,
        enum: ['admin','trabajador', 'usuario'],
        default: 'usuario'
    },
});

userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', userSchema);