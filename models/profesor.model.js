const { Schema, model } = require('mongoose');

const ProfesorSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    status: {
      type: Boolean,
      default: true
    }
});

module.exports = model( 'Profesor', ProfesorSchema );