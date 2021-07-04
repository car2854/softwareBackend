const { Schema, model } = require('mongoose');

const ExamenSchema = Schema({
    profesor: {
      type: Schema.Types.ObjectId,
      ref: 'Profesor',
    },
    materias: {
      type: Schema.Types.ObjectId,
      ref: 'Materia',
    }
});

module.exports = model( 'Examen', ExamenSchema );