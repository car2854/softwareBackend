const { Schema, model } = require('mongoose');

const MateriasSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    profesor: {
      type: Schema.Types.ObjectId,
      ref: 'Profesor',
    }
});

module.exports = model( 'Materia', MateriasSchema );