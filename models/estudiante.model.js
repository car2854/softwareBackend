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
    },
    foto2: {
        type: String,
    },
    foto3: {
        type: String,
    },
    bucket1: {
      type: String
    },
    bucket2: {
      type: String
    },
    bucket3: {
      type: String
    }
});

module.exports = model( 'Estudiante', EstudianteSchema );