const { Schema, model } = require('mongoose');

const ExamenSchema = Schema({
    titulo: {
      type: String,
      require: true,
    },
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