const { Schema, model } = require('mongoose');

const InscripcionesSchema = Schema({
    Materia: {
      type: Schema.Types.ObjectId,
      ref: 'Materia',
    },
    Estudiante: {
      type: Schema.Types.ObjectId,
      ref: 'Estudiante',
    }
});

module.exports = model( 'Inscripciones', InscripcionesSchema );