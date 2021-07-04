const { Schema, model } = require('mongoose');

const EstudianteSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    ci: {
        type: String,
        required: true,
    },
    foto1: {
        type: String,
        required: true,
    },
    foto2: {
        type: String,
        required: true,
    },
    foto3: {
        type: String,
        required: true,
    }
});

module.exports = model( 'Estudiante', EstudianteSchema );