const { Schema, model } = require('mongoose');

const InscripcionesSchema = Schema({
    materia: {
      type: Schema.Types.ObjectId,
      ref: 'Materia',
    },
    estudiante: {
      type: Schema.Types.ObjectId,
      ref: 'Estudiante',
    }
});

module.exports = model( 'Inscripciones', InscripcionesSchema );