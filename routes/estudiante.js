/*
  Path: 'api/estudiante'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { validateFields } = require('../middleware/validate-fileds');
const { validarJWT } = require('../middleware/validate-jwt');

const { 
  createEstudiante, 
  inscripcionEstudiante, 
  getEstudiantes, 
  ingresarExamen,
  uninscripcionEstudiante,
  obtenerIngreso
} = require('../controllers/estudiante.controller');

router.post('/', [
    validarJWT,
    check('email', 'El email es obligatorio').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ci', 'La ci es obligatorio').not().isEmpty(),
    validateFields
  ],
  createEstudiante
);

router.delete('/:id/:materia', [
    validarJWT
  ],
  uninscripcionEstudiante
);


router.post('/inscripcion', [
    validarJWT,
    check('estudiante', 'El la id del estudiante obligatorio').isMongoId(),
    check('materia', 'El la id de la materia obligatorio').isMongoId(),
    validateFields
  ],
  inscripcionEstudiante
);


router.post('/ingresar', [
    validarJWT,
    check('examen', 'El la id del examen obligatorio').isMongoId(),
    validateFields
  ],
  ingresarExamen
);

router.get('/obtenerIngreso/:examen',
  validarJWT,
  obtenerIngreso
)

router.get('/', validarJWT, getEstudiantes);

module.exports = router;
