/*
  Path: 'api/materia'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fileds');

const router = Router();

const { validarJWT } = require('../middleware/validate-jwt');
const { createMateria, getMaterias, getEstudiantesMateria, getExamenes } = require('../controllers/materia.controller');


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    check('id', 'El id del profesor es invalido').isMongoId(),
    validateFields
  ],
  createMateria
);

router.get('/', validarJWT, getMaterias);

router.get('/estudiantes/:materia', validarJWT, getEstudiantesMateria);

router.get('/examenes/:materia', validarJWT, getExamenes);


module.exports = router;