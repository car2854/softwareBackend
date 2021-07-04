/*
  Path: 'api/estudiante'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { validateFields } = require('../middleware/validate-fileds');
const { validarJWT } = require('../middleware/validate-jwt');

const { createEstudiante, inscripcionEstudiante } = require('../controllers/estudiante.controller');


router.post('/', [
    validarJWT,
    check('email', 'El email es obligatorio').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ci', 'La ci es obligatorio').not().isEmpty(),
    check('foto1', 'La foto1 es obligatorio').not().isEmpty(),
    check('foto2', 'La foto2 es obligatorio').not().isEmpty(),
    check('foto3', 'La foto3 es obligatorio').not().isEmpty(),
    validateFields
  ],
  createEstudiante
);

router.post('/inscripcion', [
    validarJWT,
    check('estudiante', 'El la id del estudiante obligatorio').isMongoId(),
    check('materia', 'El la id de la materia obligatorio').isMongoId(),
    validateFields
  ],
  inscripcionEstudiante
);

module.exports = router;
