const { Schema, model } = require('mongoose');

const IngresoSchema = Schema({
    estudiante: {
      type: Schema.Types.ObjectId,
      ref: 'Estudiante',
    },
    examen: {
      type: Schema.Types.ObjectId,
      ref: 'Examen',
    }
});

module.exports = model( 'Ingreso', IngresoSchema );