/*
  Path: 'api/materia'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fileds');

const router = Router();

const { validarJWT } = require('../middleware/validate-jwt');
const { createMateria, getMaterias, getEstudiantesMateria, getExamenes, getMateria, getMateriasEstudiante } = require('../controllers/materia.controller');


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    validateFields
  ],
  createMateria
);

router.get('/', validarJWT, getMaterias);

// Obtener la lista de todas las materias de un estudiante
router.get('/estudiante', validarJWT, getMateriasEstudiante);

router.get('/examenes/:materia', validarJWT, getExamenes);

router.get('/estudiantes/:materia', validarJWT, getEstudiantesMateria);

router.get('/:id', validarJWT, getMateria);

module.exports = router;
