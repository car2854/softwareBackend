const { Schema, model } = require('mongoose');

const ExamenSchema = Schema({
    descripcion: {
      type: String,
      require: true,
    },
    profesor: {
      type: Schema.Types.ObjectId,
      ref: 'Profesor',
    },
    materia: {
      type: Schema.Types.ObjectId,
      ref: 'Materia',
    }
});

module.exports = model( 'Examen', ExamenSchema );